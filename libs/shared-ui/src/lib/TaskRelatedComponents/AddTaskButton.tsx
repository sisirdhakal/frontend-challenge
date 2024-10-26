// libs/shared-ui/src/lib/TaskRelatedComponents/AddTaskButton.tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { FaPlus } from 'react-icons/fa';
import { taskModalState } from '../../../../../apps/todo-app/src/app/store/atomSetup';

export const AddTaskButton = () => {
  const [modalState, setModalState] = useRecoilState(taskModalState);

  const handleClick = () => {
    setModalState({ isOpen: true, task: null });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full border rounded-md px-6 py-4 flex items-center justify-start gap-4 text-gray-600"
    >
      <FaPlus />
      <span>Add a New Task</span>
    </button>
  );
};
