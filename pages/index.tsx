import React from 'react';
import HomeLayout from '@/components/HomeLayout';
import TaskCard from '@/components/TaskCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { dateSort } from '@/utils/compareDate';
import { TodoInterface } from '@/utils/compareDate';
import { getAuthToken } from '@/utils/getToken';
import Pagination from '@mui/material/Pagination';
import PriorityChart from '@/components/priorityChart';



export default function Home() {
  const [deleteTask, setdeleteTask] = React.useState(false);
  const [markedTask, setmarkedTask] = React.useState(false);
  const [search, setsearch] = React.useState('');
  const [allTodos, setallTodos] = React.useState<TodoInterface[]>([]);

  // Pagination state
 const [currentPage, setCurrentPage] = React.useState(1); 
    const [totalPages, setTotalPages] = React.useState(1);  

  // Fetch all todos
  const getTodos = async (page: number, pageSize: number) => {
    const token = getAuthToken();

    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/getallpendingtodos`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, pageSize },
        })
        .then((data) => {
          setallTodos(data.data.todos);
          setTotalPages(data.data.totalPages);
        });
    } catch (error: any) {
      return toast.error(error.response.data.err);
    }
  };

  // After delete and marked complete/uncompleted, update todo list
  React.useEffect(() => {
    getTodos(currentPage, 6);
  }, [deleteTask, markedTask,currentPage]);

  // Handle search functionality
  const handleSearch = () => {
    const dummyarr = allTodos.filter((todoData) =>
      todoData.title.toLowerCase().includes(search.toLowerCase())
    );
    // Sort according to dueDate
    return dateSort(dummyarr);
  };


 

  return (
    <HomeLayout>
      <div className='bg-[#FFDDD2] px-[2rem] py-[2rem] h-full overflow-y-scroll no-scrollbar'>
        <PriorityChart/>
        <div className='flex justify-center'>
          <div className='border-b-[2px] border-solid border-[#006D77]'>
            <h1 className='m-[auto] text-[1.3rem] font-[700] text-[#006D77] leading-[40px]'>
              Pending Task
            </h1>
          </div>
        </div>

        <div className='mt-[2rem]'>
          <div className='w-[100%] sm:w-[70%] md:w-[70%] lg:w-[25%] rounded-md bg-[#FFDDD2]'>
            <input
              type='text'
              className='w-[100%] px-[0.7rem] py-[0.5rem] outline-none border-[#006D77] border-solid border-[1.5px] bg-[#FFDDD2] rounded-md placeholder:text-sm'
              placeholder='Search Todo Here'
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Tasks Grid */}
        <div className='mt-[2rem] flex flex-wrap gap-[2rem]'>
          {handleSearch().map((allTodosData: TodoInterface, index: number) => {
            // for only show uncompleted tasks
            if (!allTodosData.status) {
              return (
                <div
                  className='basis-[100%] md:basis-[40%] lg:basis-[30%] sm:basis-[46%] m-[auto] sm:m-[0] md:m-0 lg:m-0'
                  key={`${allTodos}+${index}`}
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
            }
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
}
