import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import { SearchProvider } from './shared/context';
import { ViewProvider } from './shared/context';
import { NotificationProvider } from './shared/context/notificationContext';
import { Notifications } from './shared/components/notifications/notifications';
import { AppHeader } from './layout/appHeader/appHeader';
import { Sidebar } from './layout/sidebar';
import Dashboard from './features/tasks/views/dashboard';
import MyTasks from './features/tasks/views/myTasks';
import Profile from './features/profile/views/profile';
import About from './features/about/views/about';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SearchProvider>
        <ViewProvider>
          <NotificationProvider>
            <BrowserRouter>
              <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-5">
                <Sidebar />
                <div className="flex flex-col flex-1 w-full">
                  <AppHeader />
                  <Notifications /> 
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
          </NotificationProvider>
        </ViewProvider>
      </SearchProvider>
    </ApolloProvider>
  );
};


export default App;
