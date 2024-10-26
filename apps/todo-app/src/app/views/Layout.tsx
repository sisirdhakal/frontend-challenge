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
  const { addTask, getTaskCounts, updateTask, removeTask } = useTaskManager();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isSm = useMediaQuery('sm');

  const toggleAddEditTasks = (value?: boolean) => {
    setTaskModalState((prev) => ({
      isOpen: value !== undefined ? value : !prev.isOpen,
      task: prev.task,
    }));
  };

  const toggleSidebar = (value?: boolean) => {
    if (isSm) {
      setSidebarOpen(value !== undefined ? value : !isSidebarOpen);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  const handleAddOrUpdateTask = (
    task: Task,
    editTask: boolean,
    remove?: boolean
  ) => {
    if (remove) {
      removeTask(task.id);
      toast.success('Task removed successfully!');
      toggleAddEditTasks(false);
      return;
    }

    if (editTask) {
      updateTask(task);
      toast.success('Task updated successfully!');
    } else {
      addTask(task);
      toast.success('Task added successfully!');
    }
    toggleAddEditTasks(false);
  };

  const confirmDeleteTask = () => {
    if (task) {
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (task) {
      handleAddOrUpdateTask(task, false, true);
      setDeleteDialogOpen(false);
    }
  };
  // Getting the component based on the selected page
  const PageComponent = getPageComponent(selectedPage.name, selectedPage.type);

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
      {isSm ? (
        <Dialog
          isOpen={isOpen}
          onClose={toggleAddEditTasks}
          title="Add/Edit Task"
        >
          <AddEditTasks
            toggleAddEditTasks={toggleAddEditTasks}
            onSubmit={handleAddOrUpdateTask}
            taskToEdit={task}
            onDelete={confirmDeleteTask}
          />
        </Dialog>
      ) : (
        isOpen &&
        !isSm && (
          <AddEditTasks
            toggleAddEditTasks={toggleAddEditTasks}
            onSubmit={handleAddOrUpdateTask}
            taskToEdit={task}
            onDelete={confirmDeleteTask}
          />
        )
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Confirm Deletion"
      >
        <div className="py-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="mt-2 text-gray-600">This action is irreversible!</p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white px-4 py-1 rounded-md w-32 hover:bg-red-700 transition duration-200"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-gray-300 text-gray-800 px-4 py-1 w-32 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Layout;
