import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { FaTasks, FaRegCalendarAlt } from 'react-icons/fa';

export type TaskType = {
  name: string;
  icon: JSX.Element;
};

export const taskTypes: TaskType[] = [
  {
    name: 'Upcoming',
    icon: <MdKeyboardDoubleArrowRight />,
  },
  {
    name: 'Today',
    icon: <FaTasks />,
  },
  {
    name: 'Calendar',
    icon: <FaRegCalendarAlt />,
  },
];
export const categoriesType = [
  {
    name: 'Personal',
    class: 'bg-red-400',
    type: 'category',
  },
  {
    name: 'Work',
    class: 'bg-cyan-400',
    type: 'category',
  },
  {
    name: 'Other',
    class: 'bg-yellow-400',
    type: 'category',
  },
];
