// apps/todo-app/src/app/store/atomSetup.ts

import { atom } from 'recoil';
import { Task } from '@frontend-challenge/todoSchema';

// Atom to hold all tasks
export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
});

// Atom to store Seleted Page Component
export const selectedPageState = atom<string>({
  key: 'selectedPageState',
  default: 'Today', // Default is 'Today' page
});
