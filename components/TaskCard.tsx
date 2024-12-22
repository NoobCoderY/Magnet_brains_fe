import React from 'react';
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import ContentModeal from '../components/ContentModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConfirmDeleteDialog from './TaskDeleteDialog';
import { getAuthToken } from '@/utils/getToken';

const priorityColors: Record<string, string> = {
  low: '#38BDF8',
  medium: '#f8b500',
  high: '#ff0000',
};

const TaskCard = ({
  todoData,
  deleteTask,
  setdeleteTask,
  markedTask,
  setmarkedTask,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(todoData.status);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleMakerd();
  };

  // for function close and open modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmDeleteDialogOpen = () => {
    setIsDeleting(true);
  };
  const handleConfirmDeleteDialogClose = () => {
    setIsDeleting(false);
  };

  function navigateEditPAge() {
    // Use the router's push method to redirect to the Edit Page
    router.push(`editTask/${todoData._id}`);
  }

  // for delete task
  const handleDelete = async () => {
    const token = getAuthToken();
    try {
      await axios
        .delete(
          `${process.env.NEXT_PUBLIC_API_URL}/deletetodo/${todoData?._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          toast.success(`${data?.data.message}`);
          setdeleteTask(!deleteTask);
        });
    } catch (err: any) {
      return toast.error(err?.response?.data.err);
    }
  };

  // for change task status
  const handleMakerd = async () => {
    const token = getAuthToken();
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/updatetodo/${todoData?._id}`,
          {
            ...todoData,
            status: !todoData.status,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          toast.success(`${data?.data.message}fully edited`);
          setmarkedTask(!markedTask);
        });
    } catch (err: any) {
      return toast.error(err?.response?.data.err);
    }
  };

  return (
    <div>
      <div className=' bg-[#006D77]  p-[0.7rem] rounded-lg'>
        <div className='flex justify-between items-center'>
          <p className='leading-[18px] text-[#FFDDD2] text-[1rem] break-all'>
            {todoData?.title}
          </p>
          <span
            className='cursor-pointer'
            onClick={handleOpen}
          >
            {' '}
            <AiOutlineInfoCircle color='#FFDDD2' />
          </span>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <p className='leading-[14px] text-[#FFDDD2] text-[0.7rem]'>
            Due-Date: {todoData?.dueDate}
          </p>
          <span
            className='cursor-pointer'
            onClick={() => {
              navigateEditPAge();
            }}
          >
            {' '}
            <AiOutlineEdit color='#FFDDD2' />
          </span>
        </div>
        <div className='flex justify-between items-center mt-1'>
          <div className='flex items-center'>
            <Checkbox
              value={checked}
              checked={checked}
              onChange={handleChange}
              className='border-[#FFDDD2]'
            />
            <p className='leading-[14px] text-[#FFDDD2] text-[0.7rem]'>
              Mark as completed
            </p>
          </div>
          <span
            className='cursor-pointer'
            onClick={() => {
              handleConfirmDeleteDialogOpen();
            }}
          >
            {' '}
            <AiOutlineDelete color='#FFDDD2' />
          </span>
        </div>
        <div className='flex justify-between items-center '>
          <div className='flex items-center gap-4'>
            
            <p className='leading-[14px] text-[#FFDDD2] text-[0.9rem] font-semibold'>
              Priority: 
            </p>
            <div className={`w-[1rem] h-[1rem] rounded-full`} style={{ backgroundColor: priorityColors[todoData?.priority] }}></div>
          </div>
         
        </div>
      </div>
      <ContentModeal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        contentData={todoData?.description}
      />
      <ConfirmDeleteDialog
        open={isDeleting}
        handleOpen={handleConfirmDeleteDialogOpen}
        handleClose={handleConfirmDeleteDialogClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TaskCard;
