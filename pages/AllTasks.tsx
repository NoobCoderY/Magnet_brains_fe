import HomeLayout from '@/components/HomeLayout';
import TaskCard from '@/components/TaskCard';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { TodoInterface } from '@/utils/compareDate';
import { getAuthToken } from '@/utils/getToken';
import Pagination from '@mui/material/Pagination';
import PriorityChart from '@/components/priorityChart';



const AllTasks = () => {
  const [deleteTask, setdeleteTask] = React.useState(false);
  const [markedTask, setmarkedTask] = React.useState(false);
  const [allTodos, setallTodos] = React.useState<TodoInterface[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1); 
   const [totalPages, setTotalPages] = React.useState(1); 

  // Fetch all todos (complete + running)
  const getTodos = async (page: number, pageSize: number) => {
    const token = getAuthToken();
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/getalltodos`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, pageSize },
        })
        .then((data) => {
          setallTodos(data.data.todos);
          setTotalPages(data.data.totalPages);
        });
    } catch (error: any) {
      return toast.error(error?.response?.data?.err || 'Error fetching todos');
    }
  };

  // Update todo list after task deletion or completion
  React.useEffect(() => {
    getTodos(currentPage, 6);
  }, [deleteTask, markedTask, currentPage]);
   

 


  return (
    <HomeLayout>
      <div className='bg-[#FFDDD2] px-[2rem] py-[2rem] h-full no-scrollbar overflow-y-scroll'>
        <PriorityChart/>
        <div className='flex justify-center '>
          <div className='border-b-[2px] border-solid border-[#006D77] '>
            <h1 className='m-[auto] text-[1.3rem] font-[700] text-[#006D77] leading-[40px]'>
              All Tasks
            </h1>
          </div>
        </div>

        <div className='mt-[2rem] flex flex-wrap gap-[2rem]'>
          {allTodos.map((allTodosData, index) => {
            return (
              <div
                className='basis-[100%] md:basis-[40%] lg:basis-[30%] sm:basis-[46%] m-[auto] sm:m-[0] md:m-0 lg:m-0'
                key={`${allTodosData?.title}+${index}`}
              >
                <TaskCard
                  todoData={allTodosData}
                  deleteTask={deleteTask}
                  setdeleteTask={setdeleteTask}
                  markedTask={markedTask}
                  setmarkedTask={setmarkedTask}
                />
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-center mt-[2rem]'>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color='primary'
          />
        </div>
      </div>
    </HomeLayout>
  );
};

export default AllTasks;
