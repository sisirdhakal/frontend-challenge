// apps/todo-app/src/app/views/Layout.tsx

import React, { useState } from 'react';
import { AddEditTasks, Sidebar } from '@frontend-challenge/shared-ui';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedPageState, taskModalState } from '../store/atomSetup';
import { getPageComponent } from './TaskPages/ComponentFactory';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@frontend-challenge/todoSchema';

type Props = {};

const Layout: React.FC<Props> = (props: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const selectedPage = useRecoilValue(selectedPageState);
  const { isOpen } = useRecoilValue(taskModalState);
  const setTaskModalState = useSetRecoilState(taskModalState);
  const { addTask } = useTaskManager();

  const toggleAddEditTasks = () => {
    setTaskModalState((prev) => ({ isOpen: !prev.isOpen, task: prev.task }));
  };

  const handleAddTask = (task: Task) => {
    addTask(task);
    toggleAddEditTasks();
  };
  // Getting the component based on the selected page
  const PageComponent = getPageComponent(selectedPage);

  return (
    <div className="flex min-h-screen p-6 rounded-md gap-5">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'max-w-full' : 'max-w-3xl'
        }`}
      >
        <PageComponent />
      </main>
      {isOpen && (
        <AddEditTasks
          toggleAddEditTasks={toggleAddEditTasks}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};

export default Layout;
