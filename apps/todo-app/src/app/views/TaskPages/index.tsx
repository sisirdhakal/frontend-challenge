import React from 'react';
import { useTaskManager } from '../../hooks/useTaskManager';
import { AddTaskButton, TaskItem } from '@frontend-challenge/shared-ui';
import { usePageFilter } from '@frontend-challenge/hooks';

const TaskPages = () => {
  const { currentPage } = usePageFilter();
  const { getFilteredTasks, updateTask } = useTaskManager();
  const categoryTasks = getFilteredTasks(
    currentPage.name as 'Work' | 'Other' | 'Personal'
  );

  return (
    <>
      <div className="flex items-center gap-10 justify-start">
        <h1 className="text-5xl font-sans font-semibold text-gray-900 tracking-wide">
          {currentPage.name}
        </h1>
        <span className="border rounded-md text-4xl w-12 h-12 flex items-center justify-center">
          {categoryTasks.length}
        </span>
      </div>

      <div className="mt-14">
        <AddTaskButton />

        <ul className="mt-5 ">
          {categoryTasks?.map((task) => (
            <div key={task.id}>
              <TaskItem task={task} onToggle={updateTask} />
              {categoryTasks.length > 1 && (
                <div className="w-full h-[1px] my-2 bg-gray-200" />
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TaskPages;
