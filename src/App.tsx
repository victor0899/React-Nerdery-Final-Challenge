import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { client } from './apollo/client';
import { SearchProvider } from './context/searchContext';
import { ViewProvider } from './context/viewContext';
import { Sidebar } from './components/sidebar/Sidebar';
import AppHeader from './components/appHeader/AppHeader';
import DashboardCard from './components/Dashboard';
import MyTask from './components/myTask';
import Profile from './profile';
import About from './components/about';

function App() {
  return (
    <ApolloProvider client={client}>
      <SearchProvider>
        <ViewProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-neutral-5">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <Sidebar />
                  <main className="flex-1">
                    <div className="w-full space-y-4">
                      <AppHeader />
                      <Routes>
                        <Route path="/dashboard" element={<DashboardCard />} />
                        <Route path="/tasks" element={<MyTask />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </ViewProvider>
      </SearchProvider>
    </ApolloProvider>
  );
}

export default App;