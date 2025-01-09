export interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
  pointEstimate: string;
  assignee: {
    fullName: string;
    email: string;
    avatar: string;
  };
  tags: string[];
}

export interface CreateTaskInput {
  name: string;
  pointEstimate: 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT';
  assigneeId: string;
  dueDate: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  tags: string[];
  position: number;
}