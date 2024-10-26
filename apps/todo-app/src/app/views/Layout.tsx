// apps/todo-app/src/app/views/Layout.tsx

import React, { useState } from 'react';
import { AddEditTasks, Sidebar } from '@frontend-challenge/shared-ui';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedPageState, taskModalState } from '../store/atomSetup';
import { getPageComponent } from './TaskPages/ComponentFactory';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@frontend-challenge/todoSchema';
import { toast } from 'react-toastify';

type Props = {};

const Layout: React.FC<Props> = (props: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const selectedPage = useRecoilValue(selectedPageState);
  const { isOpen, task } = useRecoilValue(taskModalState);
  const setTaskModalState = useSetRecoilState(taskModalState);
  const { addTask, getTaskCounts, updateTask } = useTaskManager();

  const toggleAddEditTasks = () => {
    setTaskModalState((prev) => ({ isOpen: !prev.isOpen, task: prev.task }));
  };

  const handleAddOrUpdateTask = (task: Task, editTask: boolean) => {
    if (editTask) {
      updateTask(task);
      toast.success('Task updated successfully!');
    } else {
      addTask(task);
      toast.success('Task added successfully!');
    }
    toggleAddEditTasks();
  };
  // Getting the component based on the selected page
  const PageComponent = getPageComponent(selectedPage);

  return (
    <div className="flex min-h-screen p-6 rounded-md gap-5">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        getTaskCounts={getTaskCounts}
      />
      <main className={`flex-1 transition-all duration-300 w-full`}>
        <PageComponent />
      </main>
      {isOpen && (
        <AddEditTasks
          toggleAddEditTasks={toggleAddEditTasks}
          onSubmit={handleAddOrUpdateTask}
          taskToEdit={task}
        />
      )}
    </div>
  );
};

export default Layout;
