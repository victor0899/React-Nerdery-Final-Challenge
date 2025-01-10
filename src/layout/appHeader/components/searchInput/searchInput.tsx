import React from 'react';
import { PLACEHOLDERS } from '../../constants';
import { useSearch } from '../../../../shared/context';
import { SearchInputProps } from './types';

export const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = PLACEHOLDERS.SEARCH 
}) => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="flex items-center flex-1 relative"> 
      <i className="ri-search-line absolute left-6 text-neutral-2 text-2xl" /> 
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none text-neutral-2 placeholder-neutral-2 leading-6 text-base pl-16"
      />
      <i className="ri-notification-3-line w-6 h-6 ml-6 text-neutral-2 text-2xl" />
    </div>
  );
};