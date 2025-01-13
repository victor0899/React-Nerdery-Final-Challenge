import { SearchInput } from './components/searchInput';
import { ProfileAvatar } from './components/profileAvatar';

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between bg-neutral-4 px-6 py-3 border-b border-neutral-3 mt-8 rounded-2xl">
      <SearchInput />
      <ProfileAvatar />
    </header>
  );
};

export default AppHeader;