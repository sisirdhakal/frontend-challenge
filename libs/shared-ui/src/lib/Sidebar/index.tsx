import React from 'react';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { categoriesType, TaskType, taskTypes } from './sidebarConstants';
import { useMediaQuery, usePageFilter } from '@frontend-challenge/hooks';
import { useSetRecoilState } from 'recoil';
import { taskModalState } from '../../../../../apps/todo-app/src/app/store/atomSetup';

type TaskCounts = {
  today: number;
  upcoming: number;
  categories: Record<string, number>;
};

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: (value?: boolean) => void;
  getTaskCounts: () => TaskCounts;
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  getTaskCounts,
}) => {
  const { currentPage, updatePageFilter } = usePageFilter();
  const setTaskModalState = useSetRecoilState(taskModalState);
  const taskCounts = getTaskCounts();
  const isSm = useMediaQuery('sm');

  const handlePageFilter = (item: TaskType) => {
    if (isSm) {
      updatePageFilter(item.name);
      toggleSidebar(true);
    } else {
      updatePageFilter(item.name);
      setTaskModalState({ isOpen: false, task: null });
    }
  };
  return (
    <>
      <div
        className={`bg-[#F4F4F4]  text-gray-900 transition-all duration-300 rounded-[10px] w-full ${
          !isSm && (isOpen ? 'lg:w-72' : 'lg:w-20')
        } lg:h-[calc(94vh)] lg:sticky lg:top-3`}
      >
        <div className="flex flex-col p-4 overflow-hidden">
          {/* Sidebar header */}
          <div
            className={`flex items-start sticky lg:relative top-0 lg:mb-4 transition-all duration-300 ${
              !isSm && (isOpen ? 'ml-0 pr-0' : '-ml-[240px] pr-3')
            }`}
          >
            <div className="rounded-full bg-cyan-500 w-12 h-12 flex items-center justify-center">
              <IoPersonCircleSharp className="text-white w-11 h-11" />
            </div>
            <div
              className={`ml-3 flex-1 transition-all duration-300 ${
                !isSm && (isOpen ? 'opacity-100' : 'opacity-0')
              }`}
            >
              <span className="block font-medium text-lg text-gray-900">
                Test User
              </span>
              <span className="block text-sm text-gray-600">
                test@gmail.com
              </span>
            </div>
            {/* Toggle button */}
            <button
              onClick={() => toggleSidebar()}
              className="flex flex-col justify-center items-center pt-2 ml-2 transition-transform duration-300"
            >
              <span
                className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}
              />
              <span
                className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}
              />
            </button>
          </div>

          {/* Sidebar body */}
          <div
            className={`transition-all duration-300 bg-[#F4F4F4] -ml-4 lg:ml-0 pt-8 lg:pt-0 px-4 lg:px-0 mt-[64px] lg:mt-[0px] w-[99%] lg:w-auto h-full ${
              isOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
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
                      currentPage == item.name
                        ? 'bg-gray-200 font-semibold'
                        : 'font-normal'
                    } hover:bg-gray-200 transition-all duration-300 cursor-pointer  flex items-center justify-between h-10`}
                    onClick={() => handlePageFilter(item)}
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
                      currentPage == item.name
                        ? 'bg-gray-200 font-semibold'
                        : 'font-normal'
                    } hover:bg-gray-200 transition-all duration-300 cursor-pointer flex items-center gap-3 h-10`}
                    onClick={() => updatePageFilter(item.name)}
                  >
                    <span className={`w-4 h-4 rounded-sm ${item.class}`} />
                    <span className="w-full">{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
