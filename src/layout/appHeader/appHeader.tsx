import { MainHeader } from './components/mainHeader';
import { SearchInput } from './components/searchInput';
import { ProfileAvatar } from './components/profileAvatar';
import { useSearch } from '../../shared/context';

export const AppHeader = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className="flex items-center justify-between bg-neutral-4 px-6 py-3 border-b border-neutral-3">
      <MainHeader />
      <div className="flex items-center gap-4">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
        />
        <ProfileAvatar />
      </div>
    </header>
  );
};

export default AppHeader;