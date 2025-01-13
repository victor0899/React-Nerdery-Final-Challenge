import { createContext, useContext, useState } from 'react';
import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';

type SearchContextType = {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const value = useMemo(
    () => ({
      searchTerm,
      debouncedSearchTerm,
      setSearchTerm,
    }),
    [searchTerm, debouncedSearchTerm]
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};