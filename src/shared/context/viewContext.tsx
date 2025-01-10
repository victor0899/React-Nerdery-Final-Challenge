import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewType = 'card' | 'list';

interface ViewContextType {
  view: ViewType;
  setView: (view: ViewType) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

interface ViewProviderProps {
  children: ReactNode;
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
  const [view, setView] = useState<ViewType>('card');

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  
  return context;
};