import React from 'react';
import { useSearch } from '../../../context/searchContext';
import { SearchInput } from '../searchInput';
import { ProfileAvatar } from '../profileAvatar';

export const AppHeader: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full space-y-4">
      <header className="w-full">
        <div className="flex items-center justify-between w-full h-16 px-6 py-3 bg-neutral-4 rounded-2xl shadow-sm">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-6 h-6">
              <i className="ri-notification-3-line text-neutral-2 text-2xl" />
            </div>
            <ProfileAvatar />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;