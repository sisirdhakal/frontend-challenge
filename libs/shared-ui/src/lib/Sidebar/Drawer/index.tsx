import React from 'react';
import { categoriesType, TaskType, taskTypes } from '../sidebarConstants';
import { TaskCounts } from '..';

type Props = {
  isOpen: boolean;
  taskCounts: TaskCounts;
  handlePageFilter: (name: string, type: string) => void;
  currentPage: { name: string; type: string };
};

const Drawer = ({
  isOpen,
  taskCounts,
  handlePageFilter,
  currentPage,
}: Props) => {
  return (
    <>
      <div
        className={`transition-all duration-300 bg-[#F4F4F4] -ml-4 lg:ml-0 pt-8 lg:pt-0 px-4 lg:px-0 mt-[64px] lg:mt-[0px] w-[99%] lg:w-auto h-full ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } absolute lg:relative z-20`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 h-10 focus:ring-cyan-500"
        />

        <h3 className="mt-4 font-medium text-md">Tasks</h3>
        <ul className="mt-1 space-y-1">
          {taskTypes.map((item) => {
            const count =
              item.name === 'Upcoming'
                ? taskCounts?.upcoming
                : item.name === 'Today'
                ? taskCounts?.today
                : 0;
            return (
              <li
                key={item.name}
                className={`px-2 rounded-md ${
                  currentPage.name == item.name
                    ? 'bg-gray-200 font-semibold'
                    : 'font-normal'
                } hover:bg-gray-200 transition-all duration-300 cursor-pointer  flex items-center justify-between h-10`}
                onClick={() => handlePageFilter(item.name, 'Task')}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5">{item.icon}</span>
                  <span className="w-full">{item.name}</span>
                </div>
                <span className="text-gray-700 bg-[#F4F4F4] px-2 rounded-sm">
                  {count > 0 && `${count}`}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="w-full my-2 h-[1px] rounded-md bg-gray-200"></div>
        <h3 className=" font-medium text-md">Categories</h3>
        <ul className="mt-2 space-y-1 ">
          {categoriesType.map((item) => {
            return (
              <li
                key={item.name}
                className={`px-2 rounded-md ${
                  currentPage.name == item.name
                    ? 'bg-gray-200 font-semibold'
                    : 'font-normal'
                } hover:bg-gray-200 transition-all duration-300 cursor-pointer flex items-center gap-3 h-10`}
                onClick={() => handlePageFilter(item.name, 'Category')}
              >
                <span className={`w-4 h-4 rounded-sm ${item.class}`} />
                <span className="w-full">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Drawer;
