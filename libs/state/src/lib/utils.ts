// apps/todo-app/src/app/utils.ts

import { Task, taskLists } from '@frontend-challenge/todoSchema';

/**
 * Saves tasks to localStorage
 * @param tasks - Array of Task objects to save
 */
export const setTasksToLocalStorage = (tasks: Task[]): void => {
  const tasksWithDates = tasks.map((task) => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt ? task.updatedAt.toISOString() : '',
  }));
  localStorage.setItem('tasks', JSON.stringify(tasksWithDates));
};

/**
 * Retrieves tasks from localStorage
 * @returns Array of Task objects or an empty array if no tasks are found or validation fails
 */
export const getTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    try {
      const parsedTasks = JSON.parse(storedTasks);
      const tasksWithDates = parsedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : null,
      }));
      const result = taskLists.safeParse(tasksWithDates);
      if (result.success) {
        return result.data;
      } else {
        console.error(
          'Validation failed for tasks from localStorage:',
          result.error
        );
        return [];
      }
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  }
  return [];
};
