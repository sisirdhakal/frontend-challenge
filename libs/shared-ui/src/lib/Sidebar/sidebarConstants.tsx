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

export const TODAY_TASK = 'Today';
export const UPCOMING_TASK = 'Upcoming';
export const CALENDAR_TASK = 'Calendar';
