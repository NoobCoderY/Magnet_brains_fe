'use client';
import HomeLayout from '@/components/HomeLayout';
import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { getAuthToken } from '@/utils/getToken';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
  Box,
} from '@mui/material';
import PriorityChart from '@/components/priorityChart';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: boolean;
  assignedTo: string;
  priority: string;
}

interface TaskBoardState {
  low: Task[];
  medium: Task[];
  high: Task[];
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const priorityColors: Record<string, string> = {
  low: '#38BDF8',
  medium: '#f8b500',
  high: '#ff0000',
};

let token: string | null = null;

if (typeof window !== 'undefined') {
   token = getAuthToken();
}

const TaskBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tasks, setTasks] = useState<TaskBoardState>({
    low: [],
    medium: [],
    high: [],
  });
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const getTodos = async (page: number, pageSize: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getalltodos`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, pageSize },
        }
      );

      const todos = response?.data?.todos;
      if (todos) {
        const low = todos.filter((task: Task) => task.priority === 'low');
        const medium = todos.filter((task: Task) => task.priority === 'medium');
        const high = todos.filter((task: Task) => task.priority === 'high');
        setTasks({ low, medium, high });
        setTotalPages(response?.data.totalPages);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.err || 'Error fetching todos');
    }
  };

  useEffect(() => {
    getTodos(currentPage, 6);
  }, [currentPage]);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (priority: keyof TaskBoardState) => {
    if (!draggedTask) return;

    const sourcePriority = draggedTask.priority;
    if (sourcePriority === priority) return; 

    const sourceTasks = tasks[sourcePriority as keyof TaskBoardState].filter(
      (t) => t._id !== draggedTask._id
    );

    const destinationTasks = [...tasks[priority], { ...draggedTask, priority }];

    setTasks((prev) => ({
      ...prev,
      [sourcePriority]: sourceTasks,
      [priority]: destinationTasks,
    }));

    axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/updatetaskpriority/${draggedTask._id}`,
      {
        priority,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setDraggedTask(null);
  };

  const openModal = (task: Task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <HomeLayout>
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#FFDDD2',
          maxHeight: '100vh',
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        <PriorityChart />
        <div style={{ display: 'flex', gap: '1rem' }}>
          {(['low', 'medium', 'high'] as (keyof TaskBoardState)[]).map(
            (priority) => (
              <div
                key={priority}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(priority)}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '1rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  color: priorityColors[priority],
                }}
              >
                <Typography
                  variant='h6'
                  style={{ textTransform: 'capitalize', marginBottom: '1rem' }}
                >
                  {priority} Priority
                </Typography>
                {tasks[priority].map((task) => (
                  <Card
                    key={task._id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onClick={() => openModal(task)}
                    style={{
                      marginBottom: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent>
                      <Typography variant='h6'>
                        {task.title.length > 20
                          ? `${task.title.slice(0, 20)}...`
                          : task.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                      >
                        {task.description.length > 20
                          ? `${task.description.slice(0, 20)}...`
                          : task.description}
                      </Typography>
                      <Typography
                        variant='caption'
                        style={{ display: 'block', marginTop: '0.5rem' }}
                      >
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions className='flex justify-between items-center'>
                      <Button
                        size='small'
                        color={task.status ? 'success' : 'error'}
                      >
                        {task.status ? 'Completed' : 'Pending'}
                      </Button>
                      <div
                        className='w-[1rem] h-[1rem] rounded-full'
                        style={{
                          backgroundColor: priorityColors[task.priority],
                        }}
                      ></div>
                    </CardActions>
                  </Card>
                ))}
              </div>
            )
          )}
        </div>

        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color='primary'
          />
        </div>

        <Modal
          open={modalOpen}
          onClose={closeModal}
        >
          <Box sx={style}>
            {currentTask && (
              <>
                <Typography
                  variant='h5'
                  gutterBottom
                >
                  {currentTask.title}
                </Typography>
                <Typography
                  variant='body1'
                  gutterBottom
                >
                  {currentTask.description}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                >
                  Assigned To: {currentTask.assignedTo}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                >
                  Priority: {currentTask.priority}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                >
                  Due Date: {new Date(currentTask.dueDate).toLocaleDateString()}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </HomeLayout>
  );
};

export default TaskBoard;
