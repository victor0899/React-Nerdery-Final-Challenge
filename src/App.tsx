import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import { SearchProvider } from './shared/context';
import { ViewProvider } from './shared/context';

// Layouts
import { AppHeader } from './layout/appHeader/appHeader';
import { Sidebar } from './layout/sidebar';

// Views
import Dashboard from './features/tasks/views/dashboard';
import MyTasks from './features/tasks/views/myTasks';
import Profile from './profile';
import About from './features/about/views/about';
import { Navigate } from 'react-router-dom';

const App = () => {
  
  return (
    <ApolloProvider client={client}>
      <SearchProvider>       {/* Asegurarnos que este provider esté antes de cualquier componente que use useSearch */}
        <ViewProvider>
          <BrowserRouter>
            <div className="flex h-screen bg-neutral-5">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <AppHeader />  {/* Este componente usa useSearch */}
                <main className="flex-1 overflow-auto bg-neutral-5">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Navigate to="/" replace />} />
                  <Route path="/my-tasks" element={<MyTasks />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
               </Routes>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </ViewProvider>
      </SearchProvider>
    </ApolloProvider>
  );
};

export default App;