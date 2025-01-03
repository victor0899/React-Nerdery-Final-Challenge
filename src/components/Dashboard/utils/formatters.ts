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
    
    if (diffDays === 0) {
      return {
        text: 'TODAY',
        className: 'bg-neutral-500/10 text-neutral-500'
      };
    } else if (diffDays === -1) {
      return {
        text: 'YESTERDAY',
        className: 'bg-primary-4/10 text-primary-4'
      };
    }
    
    const month = taskDate.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const day = taskDate.getDate();
    const year = taskDate.getFullYear();
    return {
      text: `${day} ${month}, ${year}`,
      className: 'bg-neutral-500/10 text-neutral-1'
    };
  };