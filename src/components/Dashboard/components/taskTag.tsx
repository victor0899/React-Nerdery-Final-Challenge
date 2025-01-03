export const TaskTag = ({ tag }: { tag: string }) => {
  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'IOS':
        return 'bg-secondary-4/10 text-secondary-4';
      case 'ANDROID':
        return 'bg-tertiary-4/10 text-tertiary-4';
      case 'REACT':
        return 'bg-[#61DBFB]/10 text-[#61DBFB]';
      case 'NODE_JS':
        return 'bg-gradient-to-r from-[#215732]/10 via-[#6CC24A]/10 via-[#44883E]/10 to-[#333333]/10 text-[#44883E]';
      case 'RAILS':
        return 'bg-[#CC0000]/10 text-[#CC0000]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTagText = (tag: string) => {
    switch (tag) {
      case 'NODE_JS':
        return 'NODE JS';
      case 'IOS':
        return 'IOS APP';
      default:
        return tag;
    }
  };

  return (
    <span className={`h-8 px-2 flex items-center text-sm rounded ${getTagStyle(tag)}`}>
      {formatTagText(tag)}
    </span>
  );
};