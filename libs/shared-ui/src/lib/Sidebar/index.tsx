import React from 'react';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { categoriesType, TaskType, taskTypes } from './sidebarConstants';
import { useMediaQuery, usePageFilter } from '@frontend-challenge/hooks';
import { useSetRecoilState } from 'recoil';
import { taskModalState } from '@frontend-challenge/state';
import Drawer from './Drawer';

export type TaskCounts = {
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

  const handlePageFilter = (name: string, type: string) => {
    if (isSm) {
      updatePageFilter(name, type);
      toggleSidebar(true);
    } else {
      updatePageFilter(name, type);
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
          <Drawer
            isOpen={isOpen}
            taskCounts={taskCounts}
            handlePageFilter={handlePageFilter}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};
