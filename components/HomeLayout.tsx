import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineFileDone } from 'react-icons/ai';
import {
  IoMdNotificationsOutline,
  IoIosCreate,
  IoIosLogOut,
} from 'react-icons/io';
import { MdOutlineDarkMode } from 'react-icons/md';
import {  } from 'react-icons/io';
import { MdOutlineLowPriority } from 'react-icons/md';
import { BsSearch, BsBorderAll } from 'react-icons/bs';
import { BiSolidDashboard } from 'react-icons/bi';
import { useRouter } from 'next/router';

// interface for props
interface HomelayoutProps {
  children: React.ReactNode;
}

const sidebarMenuItems = [
  {
    title: 'Pending Tasks',
    icon: <BiSolidDashboard />,
    link: '/',
  },
  {
    title: 'Completed Tasks',
    icon: <AiOutlineFileDone />,
    link: '/CompletedTasks',
  },
  {
    title: 'All Tasks',
    icon: <BsBorderAll />,
    link: '/AllTasks',
  },
  {
    title: 'Add a task',
    icon: <IoIosCreate />,
    link: '/AddTask',
  },
  {
    title: 'Task Board',
    icon: <MdOutlineLowPriority />,
    link: '/TaskBoard',

  }
];

// function for common layout
const HomeLayout: React.FC<HomelayoutProps> = (props) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('magnet_brains_auth_token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <>
      <nav className='bg-[#83C5BE] py-6 px-4 flex items-center justify-between'>
        <div className='px-[1rem] cursor-pointer'>
          <AiOutlineMenu size={25} />
        </div>
        <div className='hidden sm:block md:block lg:block w-[40%] sm:w-[38%] md:w-[25] lg:w-[25%] rounded-md bg-[#FFDDD2]  relative'>
          <input
            type='text'
            className='w-[90%] px-[0.7rem] py-[0.5rem] outline-none  bg-[#FFDDD2] rounded-md placeholder:text-sm'
            placeholder='Write Your Project name Here '
          />
          <BsSearch
            className='absolute top-[30%] right-[5%] '
            color={'#006D77'}
          />
        </div>
        <div className='flex items-center gap-5'>
          <IoMdNotificationsOutline
            size={23}
            className='cursor-pointer'
          />
          <MdOutlineDarkMode
            size={23}
            className='cursor-pointer'
          />
          <IoIosLogOut
            size={23}
            className='cursor-pointer'
            onClick={() => {
              localStorage.removeItem('magnet_brains_auth_token');
              router.replace('/login');
            }}
          />
        </div>
      </nav>
      <div className='flex  h-[100%]'>
        <div className='basis-[22%] bg-[#006D77] min-h-[100%] px-[1rem] py-[2rem] text-[#FFDDD2]'>
          <ul className='text-[#FFDDD2]'>
            {sidebarMenuItems.map((item) => {
              return (
                <li key={item.title}>
                  <Link
                    className='flex justify-start items-center gap-6 w-fit px-4 py-2 cursor-pointer mt-4'
                    href={item.link}
                  >
                    <span className=' text-2xl text-[#FFDDD2]'>
                      {item.icon}
                    </span>
                    <span className='hidden sm:inline'>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='basis-[80%] no-scrollbar '>{props.children}</div>
      </div>
    </>
  );
};

export default HomeLayout;
