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
      <SearchProvider>
        <ViewProvider>
          <BrowserRouter>
            <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-5">
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <AppHeader />
                <main className="flex-1 overflow-y-auto bg-neutral-5 p-4 lg:p-6">
                  <div className="max-w-7xl mx-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Navigate to="/" replace />} />
                      <Route path="/my-tasks" element={<MyTasks />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/about" element={<About />} />
                    </Routes>
                  </div>
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