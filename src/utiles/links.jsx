import { IoBarChart } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { LiaWpforms } from 'react-icons/lia';
import { AiOutlineProfile } from 'react-icons/ai';
export const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChart />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    path: 'add-job',
    icon: <LiaWpforms />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <AiOutlineProfile />,
  },
];
