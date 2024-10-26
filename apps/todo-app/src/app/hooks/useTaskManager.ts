import { useRecoilState } from 'recoil';
import { tasksState } from '../store/atomSetup';
import { Task, TaskCategory } from '@frontend-challenge/todoSchema';
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

  // Get filtered tasks based on the specified filter
  const getFilteredTasks = (
    filter: 'Today' | 'Tomorrow' | 'This Week' | 'Upcoming' | 'All'
  ) => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    // Calculate tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString().split('T')[0];

    // Calculate the end of the week (Sunday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

    return tasks.filter((task) => {
      const taskDate = task.createdAt.toISOString().split('T')[0];

      switch (filter) {
        case 'Today':
          return taskDate === todayISO;
        case 'Tomorrow':
          return taskDate === tomorrowISO;
        case 'This Week':
          return (
            taskDate >= todayISO &&
            taskDate <= endOfWeek.toISOString().split('T')[0]
          );
        case 'Upcoming':
          return task.status !== 'completed';
        case 'All':
        default:
          return true;
      }
    });
  };

  // Get task counts based on various criteria
  const getTaskCounts = () => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    const categoryCounts: Record<TaskCategory, number> = {
      personal: 0,
      work: 0,
      other: 0,
    };

    let todayCount = 0;
    let upcomingCount = 0;

    tasks.forEach((task) => {
      const taskDate = task.createdAt.toISOString().split('T')[0];

      if (taskDate === todayISO) {
        todayCount++;
      }

      if (taskDate > todayISO && task.status !== 'completed') {
        upcomingCount++;
      }

      const category = task.category as TaskCategory;
      if (category in categoryCounts) {
        categoryCounts[category] += 1;
      }
    });

    return {
      today: todayCount,
      upcoming: upcomingCount,
      categories: categoryCounts,
    };
  };

  return {
    tasks,
    addTask,
    updateTask,
    removeTask,
    getFilteredTasks,
    getTaskCounts,
  };
};
