export const formatPointEstimate = (pointEstimate: string) => {
  const pointMap: { [key: string]: string } = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    FOUR: '4',
    EIGHT: '8'
  };
  return `${pointMap[pointEstimate] || pointEstimate} Points`;
};

export const formatDueDate = (dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const taskDate = new Date(dueDate);
  taskDate.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const baseClass = 'bg-neutral-500/10';
  
  if (diffDays < 0) {
    return {
      text: formatDateText(taskDate, diffDays),
      className: `${baseClass} text-red-500`
    };
  } else if (diffDays <= 2) {
    return {
      text: formatDateText(taskDate, diffDays),
      className: `${baseClass} text-yellow-500`
    };
  } else {
    return {
      text: formatDateText(taskDate, diffDays),
      className: `${baseClass} text-green-500`
    };
  }
};

const formatDateText = (taskDate: Date, diffDays: number): string => {
  if (diffDays === 0) {
    return 'TODAY';
  } else if (diffDays === -1) {
    return 'YESTERDAY';
  }
  
  const month = taskDate.toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const day = taskDate.getDate();
  const year = taskDate.getFullYear();
  return `${day} ${month}, ${year}`;
}