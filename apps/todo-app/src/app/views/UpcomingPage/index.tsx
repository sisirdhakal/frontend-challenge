import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';
import { AddTaskButton } from '@frontend-challenge/shared-ui';

type Props = {};

const UpcomingPage = (props: Props) => {
  const { getFilteredTasks, addTask } = useTaskManager();
  const upcomingTasks = getFilteredTasks('Upcoming');
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
      <div className="mt-14">
        <AddTaskButton />

        <ul>
          {upcomingTasks?.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UpcomingPage;
