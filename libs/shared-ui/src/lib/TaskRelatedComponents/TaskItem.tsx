// TaskItem.tsx
import { Task } from '@frontend-challenge/todoSchema';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
}

export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const handleCheckboxChange = () => {
    onToggle(task);
  };

  return (
    <li className="flex items-start justify-start mb-4">
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={handleCheckboxChange}
        className="mr-4 w-5 h-5 rounded-md mt-1"
      />
      <div className="flex-1 items-start">
        <div>
          <h2 className="font-semibold text-lg">{task.title}</h2>
          {task.description && (
            <p className="text-gray-600">{task.description}</p>
          )}
          {task.category && <p className="text-gray-500">{task.category}</p>}
          <p className="text-gray-400">{task.createdAt.toLocaleDateString()}</p>
        </div>
        <div></div>
      </div>
    </li>
  );
};
