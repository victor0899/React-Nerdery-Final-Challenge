export type PointEstimate = 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT';
export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'CANCELLED' | 'DONE';
export type TaskTag = 'ANDROID' | 'IOS' | 'NODE_JS' | 'RAILS' | 'REACT';

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  dueDate: string;
  pointEstimate: PointEstimate;
  assignee: {
    id: string;
    fullName: string;
    email?: string;
    avatar?: string;
  };
  tags: TaskTag[];
}

export interface CreateTaskInput {
  name: string;
  assigneeId: string;  // Cambiado de assignee a assigneeId para coincidir con el schema
  dueDate: string;
  pointEstimate: PointEstimate;  // Cambiado de string a PointEstimate
  status: TaskStatus;  // Cambiado de string a TaskStatus
  tags: TaskTag[];  // Cambiado de string[] a TaskTag[]
}

export interface UpdateTaskInput {
  id: string;
  name?: string;
  assigneeId?: string;  // Cambiado de assignee a assigneeId
  dueDate?: string;
  pointEstimate?: PointEstimate;  // Cambiado de string a PointEstimate
  status?: TaskStatus;  // Cambiado de string a TaskStatus
  tags?: TaskTag[];  // Cambiado de string[] a TaskTag[]
}

export interface DeleteTaskInput {
  id: string;
}