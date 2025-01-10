import { MainHeader } from './components/mainHeader';
import { SearchInput } from './components/searchInput';
import { ProfileAvatar } from './components/profileAvatar';
import { useSearch } from '../../shared/context';

export const AppHeader = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
<header className="fixed top-8 main-container flex items-center justify-between h-16 px-6 py-3 bg-[#2C2F33] rounded-2xl z-30">
  <MainHeader />
  <div className="flex items-center gap-4 w-full">
    <SearchInput
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search"
    />
    <ProfileAvatar />
  </div>
</header>
  );
};

export default AppHeader;