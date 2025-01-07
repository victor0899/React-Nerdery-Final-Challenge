import React from 'react';
import { SearchInputProps } from '../types';
import { PLACEHOLDERS } from '../constants';

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = PLACEHOLDERS.SEARCH 
}) => (
  <div className="flex items-center flex-1">
    <i className="ri-search-line w-6 h-6 mr-6 text-neutral-2 text-2xl" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-none outline-none text-neutral-2 placeholder-neutral-2 leading-6"
    />
  </div>
);