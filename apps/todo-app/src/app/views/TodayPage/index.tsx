import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';
import { AddTaskButton, TaskItem } from '@frontend-challenge/shared-ui';

const TodayPage = () => {
  const { getFilteredTasks, updateTask } = useTaskManager();
  const todayTasks = getFilteredTasks('Today');

  return (
    <>
      <div className="flex items-center gap-10 justify-start">
        <h1 className="text-5xl font-sans font-semibold text-gray-900 tracking-wide">
          Today
        </h1>
        <span className="border rounded-md text-4xl w-12 h-12 flex items-center justify-center">
          {todayTasks.length}
        </span>
      </div>

      <div className="mt-14">
        <AddTaskButton />

        <ul className="mt-5" >
          {todayTasks?.map((task) => (
            <TaskItem task={task} onToggle={updateTask} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodayPage;
