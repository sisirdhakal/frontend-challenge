// apps/todo-app/src/app/store/atomSetup.ts

import { atom } from 'recoil';
import { Task } from '@frontend-challenge/todoSchema';
import { getTasksFromLocalStorage } from './utils';

// Atom to hold all tasks
export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: getTasksFromLocalStorage(),
});

// Atom to store Seleted Page Component
export const selectedPageState = atom<{ name: string; type: string }>({
  key: 'selectedPageState',
  default: { name: 'Today', type: 'Task' },
});

export interface TaskModalState {
  isOpen: boolean;
  task: Task | null;
}
export const taskModalState = atom<TaskModalState>({
  key: 'taskModalState',
  default: { isOpen: false, task: null },
});