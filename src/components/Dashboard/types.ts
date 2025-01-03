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