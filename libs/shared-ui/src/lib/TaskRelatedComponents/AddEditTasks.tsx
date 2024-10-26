import { usePageFilter } from '@frontend-challenge/hooks';
import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { z } from 'zod';
import { Task, taskSchema } from '@frontend-challenge/todoSchema';
import dayjs from 'dayjs';

type Props = {
  toggleAddEditTasks: (value: boolean) => void;
  taskToEdit?: Task | null;
  onSubmit: (task: Task, editTask: boolean) => void;
  onDelete: () => void;
};

export const AddEditTasks = ({
  toggleAddEditTasks,
  taskToEdit,
  onSubmit,
  onDelete,
}: Props) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    createdAt: dayjs().toISOString(), // Initialize with current date as ISO string
    category: 'personal',
    status: 'todo',
  });

  // Effect to populate the form if editing
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        createdAt: dayjs(taskToEdit.createdAt).format('YYYY-MM-DD'),
        category: taskToEdit.category || 'personal',
        status: taskToEdit.status || 'todo',
      });
    }
  }, [taskToEdit]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = taskSchema.safeParse({
      ...task,
      createdAt: new Date(task.createdAt),
      id: taskToEdit ? taskToEdit.id : Date.now(),
    });
    if (result.success) {
      onSubmit(result.data, taskToEdit ? true : false);
    } else {
      console.error('Validation errors:', result.error.format());
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`bg-[#F4F4F4] text-gray-900 transition-all duration-300 rounded-[10px] max-w-96 w-full p-4 flex flex-col lg:h-[calc(94vh)] lg:sticky top-3`}
    >
      <div className="flex items-center justify-between">
        <span className="block font-semibold text-xl text-gray-900">
          {taskToEdit ? 'Edit Task' : 'Add Task'}
        </span>
        <button onClick={() => toggleAddEditTasks(false)}>
          <IoClose className="w-6 h-6" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex h-full flex-col justify-between"
      >
        <div className="flex-1 h-full">
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="createdAt"
              value={dayjs(task.createdAt).format('YYYY-MM-DD')} // Format for input
              onChange={(e) => handleChange(e as any)} // Ensure type safety
              className="border rounded-md p-2 w-full cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category:</label>
            <select
              name="category"
              value={task.category}
              onChange={handleChange}
              className="border rounded-md p-2 w-full cursor-pointer"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status:</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="border rounded-md p-2 w-full cursor-pointer"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mt-auto h-auto">
          <button
            type="button"
            onClick={taskToEdit ? onDelete : () => toggleAddEditTasks(false)}
            className="border border-gray-400 rounded-md text-gray-700 w-full px-4 py-2"
          >
            {taskToEdit ? 'Delete Task' : 'Cancel'}
          </button>
          <button
            type="submit"
            className={`rounded-md w-full px-4 py-2 ${
              taskToEdit
                ? 'bg-yellow-400 text-black'
                : 'bg-green-500 text-white'
            }`}
          >
            {taskToEdit ? 'Save Changes' : 'Submit Task'}
          </button>
        </div>
      </form>
    </div>
  );
};
