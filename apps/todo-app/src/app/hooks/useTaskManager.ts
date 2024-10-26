// apps/todo-app/src/app/hooks/useTaskManager.ts

import { useRecoilState } from 'recoil';
import { tasksState } from '../store/atomSetup';
import { Task } from '@frontend-challenge/todoSchema';
import { getTasksFromLocalStorage, setTasksToLocalStorage } from '../utils';
import { useEffect } from 'react';

export const useTaskManager = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, [setTasks]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    setTasksToLocalStorage(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  // Update a task by id
  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Remove a task by id
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getFilteredTasks = (filter: 'Today' | 'Upcoming' | 'All') => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter((task) => {
      if (filter === 'Today') {
        return task.createdAt.toISOString().split('T')[0] === today;
      } else if (filter === 'Upcoming') {
        return task.createdAt.toISOString().split('T')[0] > today;
      } else {
        return true;
      }
    });
  };

  return {
    tasks,
    addTask,
    updateTask,
    removeTask,
    getFilteredTasks,
  };
};
