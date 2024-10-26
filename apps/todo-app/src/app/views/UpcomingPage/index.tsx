import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';
import { AddTaskButton, TaskItem } from '@frontend-challenge/shared-ui';

type Props = {};

const UpcomingPage = (props: Props) => {
  const { getFilteredTasks, updateTask } = useTaskManager();
  const todayTasks = getFilteredTasks('Today');
  const upcomingTasks = getFilteredTasks('Upcoming');
  const tomorrowTasks = getFilteredTasks('Tomorrow');
  const thisWeekTasks = getFilteredTasks('This Week');

  return (
    <>
      <div className="flex items-center gap-10 justify-start">
        <h1 className="text-5xl font-sans font-semibold text-gray-900 tracking-wide">
          Upcoming
        </h1>
        <span className="border rounded-md text-4xl w-12 h-12 flex items-center justify-center">
          {upcomingTasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-10 mt-14">
        {/* Today Box */}
        <div className="w-full bg-gray-100 p-4 rounded-lg shadow">
          <div className="flex gap-4 mb-5">
            <h1 className="text-2xl font-sans font-semibold text-gray-900 tracking-wide ">
              Today
            </h1>
            <span className="border rounded-md text-xl w-8 h-8 flex items-center justify-center">
              {todayTasks.length}
            </span>
          </div>
          <AddTaskButton />
          <ul className="mt-4">
            {todayTasks?.map((task) => (
              <div key={task.id}>
                <TaskItem task={task} onToggle={updateTask} />
                {todayTasks.length > 1 && (
                  <div className="w-full h-[1px] my-2 bg-gray-200" />
                )}
              </div>
            ))}
          </ul>
        </div>

        {/* Tomorrow and This Week Boxes */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tomorrow Box */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex gap-4 mb-5">
              <h1 className="text-2xl font-sans font-semibold text-gray-900 tracking-wide ">
                Tomorrow
              </h1>
              <span className="border rounded-md text-xl w-8 h-8 flex items-center justify-center">
                {tomorrowTasks.length}
              </span>
            </div>
            <AddTaskButton />
            <ul className="mt-4">
              {tomorrowTasks?.map((task) => (
                <div key={task.id}>
                  <TaskItem task={task} onToggle={updateTask} />
                  {todayTasks.length > 1 && (
                    <div className="w-full h-[1px] my-2 bg-gray-200" />
                  )}
                </div>
              ))}
            </ul>
          </div>

          {/* This Week Box */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex gap-4 mb-5">
              <h1 className="text-2xl font-sans font-semibold text-gray-900 tracking-wide ">
                This Week
              </h1>
              <span className="border rounded-md text-xl w-8 h-8 flex items-center justify-center">
                {thisWeekTasks.length}
              </span>
            </div>
            <AddTaskButton />
            <ul className="mt-4">
              {thisWeekTasks?.map((task) => (
                <div key={task.id}>
                  <TaskItem task={task} onToggle={updateTask} />
                  {todayTasks.length > 1 && (
                    <div className="w-full h-[1px] my-2 bg-gray-200" />
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingPage;
