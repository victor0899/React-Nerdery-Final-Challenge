import { ProfileAvatar } from './profileAvatar';
import { useSearch } from '../../context/searchContext';

const AppHeader = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full">
      <header className="w-full">
        <div className="flex items-center justify-between w-full h-16 px-6 py-3 bg-neutral-4 rounded-2xl shadow-sm">
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-6 h-6 mr-6">
              <i className="ri-search-line text-neutral-2 text-2xl"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="w-full bg-transparent border-none outline-none text-neutral-2 placeholder-neutral-2 leading-6"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-6 h-6">
              <i className="ri-notification-3-line text-neutral-2 text-2xl"></i>
            </div>
            <ProfileAvatar />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;