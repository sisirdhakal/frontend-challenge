// apps/todo-app/src/app/views/Layout.tsx

import React, { useState } from 'react';
import { AddEditTasks, Dialog, Sidebar } from '@frontend-challenge/shared-ui';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedPageState, taskModalState } from '../store/atomSetup';
import { getPageComponent } from './TaskPages/ComponentFactory';
import { useTaskManager } from '../hooks/useTaskManager';
import { Task } from '@frontend-challenge/todoSchema';
import { toast } from 'react-toastify';
import { useMediaQuery } from '@frontend-challenge/hooks';

type Props = {};

const Layout: React.FC<Props> = (props: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const selectedPage = useRecoilValue(selectedPageState);
  const { isOpen, task } = useRecoilValue(taskModalState);
  const setTaskModalState = useSetRecoilState(taskModalState);
  const { addTask, getTaskCounts, updateTask } = useTaskManager();

  const isSm = useMediaQuery('sm');

  const toggleAddEditTasks = () => {
    setTaskModalState((prev) => ({ isOpen: !prev.isOpen, task: prev.task }));
  };

  const toggleSidebar = (value?: boolean) => {
    if (isSm) {
      setSidebarOpen(value !== undefined ? value : !isSidebarOpen);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
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
    <div className="flex flex-col lg:flex-row min-h-screen p-0 lg:p-6 rounded-md gap-5 relative">
      <Sidebar
        isOpen={isSm ? !isSidebarOpen : isSidebarOpen}
        toggleSidebar={toggleSidebar}
        getTaskCounts={getTaskCounts}
      />

      <main
        className={`flex-1 transition-all duration-300 w-full px-4 pb-6 lg:pb-0 lg:px-0`}
      >
        <PageComponent />
      </main>
      {isOpen && isSm ? (
        <Dialog
          isOpen={isOpen}
          onClose={toggleAddEditTasks}
          title="Add/Edit Task"
        >
          <AddEditTasks
            toggleAddEditTasks={toggleAddEditTasks}
            onSubmit={handleAddOrUpdateTask}
            taskToEdit={task}
          />
        </Dialog>
      ) : (
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
