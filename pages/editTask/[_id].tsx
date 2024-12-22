import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CustomeTextArea from '../../components/CustmTextArea';
import DatePicker from '../../components/DatePicker';
import Button from '@mui/material/Button';
import HomeLayout from '@/components/HomeLayout';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { compareDate } from '@/utils/compareDate';
import { TodoInterface } from '@/utils/compareDate';
import { getAuthToken } from '@/utils/getToken';
import { log } from 'node:console';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#006D77',
    },
  },
});
const EditTask = () => {
  const router = useRouter();
  const currentDate = new Date();
  const [todoCreate, settodoCreate] = React.useState<TodoInterface>({
    title: '',
    dueDate: '',
    description: '',
    status: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    settodoCreate({
      ...todoCreate,
      [name]: value,
    });
  };

  //function for pre load data
  const getTodo = async () => {
    const token = getAuthToken();
    try {
      if (router.isReady && router.query._id) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/gettodo/${router?.query?._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((data) => {
            console.log(data.data.todo);
            const { title, dueDate, description, status } = data.data.todo;
            settodoCreate({
              title: title,
              dueDate: dueDate,
              description: description,
              status: status,
            });
          });
      }
    } catch (error: any) {
      toast.error(error.response.data.err);
    }
  };

  React.useEffect(() => {
    getTodo();
  }, [router.isReady]);

  // submit for final edit
  async function handleSubmit() {
    if (todoCreate.title.length < 7) {
      return toast.error('Please enter title more than 7 character');
    } else if (todoCreate.description.length < 20) {
      return toast.error('Please enter description more than 20 character');
    } else if (
      compareDate(todoCreate.dueDate) ||
      todoCreate.dueDate === 'NaN/NaN/NaN'
    ) {
      if (compareDate(todoCreate.dueDate)) {
        return toast.error('please do not enter past date');
      } else {
        return toast.error('please enter date');
      }
    } else {
      const token = getAuthToken();
      try {
        await axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/updatetodo/${router?.query?._id}`,
            todoCreate,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((data: any) => {
            toast.success(`${data?.data.message}fully edited`);
            router.push('/');
          });
      } catch (err: any) {
        return toast.error(err?.response?.data.err);
      }
    }
  }

  return (
    <HomeLayout>
      <div className='bg-[#FFDDD2] px-[2rem] pt-[2rem] h-full'>
        <div className='flex justify-center'>
          <div className='bg-[#83C5BE] p-[1rem] w-[100%] sm:w-[80%] md:w-[70%] lg:w-[50%] sm:p-[1.3rem] md:p-[1.7rem] lg:p-[2rem] flex rounded-md'>
            <h1 className=' m-[auto] text-[1.5rem]  sm:text-[1.7rem]  md:text-[2rem]  lg:text-[2.3rem]   font-[700] text-white leading-[40px]'>
              Edit Task
            </h1>
          </div>
        </div>
        <div className='flex justify-center mt-[3rem]'>
          <div className=' w-[100%] sm:w-[80%]  md:w-[70%]  lg:w-[70%]'>
            <div className='flex justify-between flex-col sm:flex-xol md:flex-row lg:flex-row gap-5'>
              <div className='basis-[42%]'>
                <CustomTextField
                  label='Title'
                  variant='outlined'
                  fullWidth
                  value={todoCreate.title}
                  name='title'
                  onChange={handleChange}
                />
              </div>
              <div className='basis-[42%]'>
                <DatePicker
                  todoCreate={todoCreate}
                  settodoCreate={settodoCreate}
                />
              </div>
            </div>
            <div className='flex justify-center mt-5 flex-col'>
              <CustomeTextArea
                todoCreate={todoCreate}
                handleChange={handleChange}
              />
              <div className='mt-2'>
                <div className='flex items-center'>
                  <Checkbox
                    checked={todoCreate.status}
                    onChange={() => {
                      settodoCreate((prev: any) => ({
                        ...todoCreate,
                        status: !prev.status,
                      }));
                    }}
                    className='border-[#FFDDD2]'
                  />
                  <p className='leading-[14px]  text-[1rem]'>
                    Mark as completed
                  </p>
                </div>
              </div>
              <div className='mx-[auto] my-5 w-[70%] sm:w-[45%] md:w-[50%] lg:w-[40%]'>
                <Button
                  variant='contained'
                  className='bg-[#006D77] hover:bg-[#006D77]'
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {' '}
                  Confirm Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default EditTask;
