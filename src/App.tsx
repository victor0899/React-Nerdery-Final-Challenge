import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import { SearchProvider } from './shared/context';
import { ViewProvider } from './shared/context';
import { AppHeader } from './layout/appHeader/appHeader';
import { Sidebar } from './layout/sidebar';
import Dashboard from './features/tasks/views/dashboard';
import MyTasks from './features/tasks/views/myTasks';
import Profile from './features/profile/views/profile';
import About from './features/about/views/about';
import { NotificationProvider } from './shared/context/notificationContext';
import { Notifications } from './shared/components/notifications/notifications';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NotificationProvider>  
        <SearchProvider>
          <ViewProvider>
            <BrowserRouter>
              <div className="flex flex-col lg:flex-row lg:gap-8 h-screen bg-neutral-5 overflow-hidden pb-8">
                <Sidebar />
                <div className="flex flex-col flex-1 w-full overflow-hidden pr-9">
                  <AppHeader />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    <Route path="/my-tasks" element={<MyTasks />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </div>
              </div>
              <Notifications />
            </BrowserRouter>
          </ViewProvider>
        </SearchProvider>
      </NotificationProvider>
    </ApolloProvider>
  );
};

export default App;
