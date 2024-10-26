// libs/types/src/lib/todoSchema.ts

import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional().default(new Date()),
  category: z.enum(['personal', 'work', 'other']),
  status: z.enum(['todo', 'in-progress', 'completed']),
});

export const taskLists = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;

export type TaskCategory = 'personal' | 'work' | 'other';
export type Status = 'todo' | 'in-progress' | 'completed';
