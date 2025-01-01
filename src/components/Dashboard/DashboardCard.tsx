import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_IN_PROGRESS_TASKS = gql`
  query GetTasks {
    tasks(input: { status: IN_PROGRESS }) {
      id
      name
      status
      dueDate
      pointEstimate
      assignee {
        fullName
        email
      }
      tags
    }
  }
`;

interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
  pointEstimate: string;
  assignee: {
    fullName: string;
    email: string;
  };
  tags: string[];
}

const DashboardCard: React.FC = () => {

  const { data, loading, error } = useQuery<{ tasks: Task[] }>(GET_IN_PROGRESS_TASKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.tasks) return <div>No tasks found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.tasks.map(task => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Points: {task.pointEstimate}
            </p>
            {task.assignee && (
              <p className="text-sm text-gray-600">
                Assignee: {task.assignee.fullName}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {task.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;