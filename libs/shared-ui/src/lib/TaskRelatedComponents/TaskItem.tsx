// libs/shared-ui/src/lib/TaskRelatedComponents/TaskItem.tsx
import { Task } from '@frontend-challenge/todoSchema';
import { taskModalState } from '../../../../../apps/todo-app/src/app/store/atomSetup';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';

import { useSetRecoilState } from 'recoil';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
}

export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const handleCheckboxChange = () => {
    const newStatus: 'todo' | 'in-progress' | 'completed' =
      task.status === 'completed' ? 'todo' : 'completed';

    const updatedTask = { ...task, status: newStatus };
    onToggle(updatedTask);
  };
  const setTaskModalState = useSetRecoilState(taskModalState);

  const handleTaskClick = () => {
    setTaskModalState({ isOpen: true, task: task });
  };
  return (
    <>
      <li className="flex items-start justify-start mb-4 gap-3 cursor-pointer px-6 py-2">
        <div
          onClick={handleCheckboxChange}
          className={`flex items-center justify-center w-5 h-5 rounded-sm border transition-all duration-300 mt-1 ${
            task.status === 'completed'
              ? 'bg-green-500 border-green-600'
              : 'border-gray-400'
          }`}
        >
          {task.status === 'completed' && (
            <IoCheckmark className="text-white text-lg" />
          )}
        </div>
        <div className="flex-1 items-start flex" onClick={handleTaskClick}>
          <div className="flex-1">
            <h2 className="font-semibold text-lg capitalize text-gray-700">
              {task.title}
            </h2>
            <div className="flex items-center gap-5 mt-1 flex-wrap">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <FaCalendarAlt />
                {task.createdAt.toLocaleDateString()}
              </p>
              {task.category && (
                <p
                  className={`text-gray-600 capitalize text-sm flex items-center gap-2`}
                >
                  <span
                    className={`${
                      task.category.toLocaleLowerCase() === 'personal'
                        ? 'bg-red-400'
                        : 'bg-cyan-400'
                    } w-[14px] h-[14px] rounded-sm`}
                  />
                  {task.category}
                </p>
              )}
            </div>
          </div>
          <div>
            <FaAngleRight className="w-5 h-5" />
          </div>
        </div>
      </li>
    </>
  );
};
