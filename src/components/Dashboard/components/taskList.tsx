import { Task } from '../types';
import { formatDueDate, formatPointEstimate } from '../utils/formatters';
import { TaskTag } from './taskTag';

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-neutral-4 rounded-lg">
        <thead className="bg-neutral-3">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-neutral-1">Task Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-neutral-1">Points</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-neutral-1">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-neutral-1">Due Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-neutral-1">Assignee</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-neutral-1">Tags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-3">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-neutral-5">
              <td className="px-6 py-4 text-sm text-neutral-1">{task.name}</td>
              <td className="px-6 py-4 text-sm text-neutral-1">
                {formatPointEstimate(task.pointEstimate)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-neutral-5 text-neutral-1">
                  {task.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded ${formatDueDate(task.dueDate).className}`}>
                  <i className="ri-alarm-line text-lg mr-2"></i>
                  <span className="text-sm">{formatDueDate(task.dueDate).text}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.fullName}
                    className="w-8 h-8 rounded-full mr-2"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/api/placeholder/32/32';
                    }}
                  />
                  <span className="text-sm text-neutral-1">{task.assignee.fullName}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {task.tags.map(tag => (
                    <TaskTag key={tag} tag={tag} />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};