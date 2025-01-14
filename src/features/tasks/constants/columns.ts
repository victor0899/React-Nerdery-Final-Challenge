import { TaskStatus } from "../types/task.types";

export const TASK_COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'BACKLOG', title: 'Backlog' },
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
  { id: 'CANCELLED', title: 'Cancelled' }
] as const;