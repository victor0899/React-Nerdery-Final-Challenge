import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { Sidebar } from './components/sidebar/Sidebar';
import AppHeader from './components/AppHeader/AppHeader'
import DashboardCard from './components/Dashboard'; 


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="min-h-screen bg-neutral-5">
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar/>
          <main className="flex-1 w-full">
            <AppHeader />
        <DashboardCard/>
          </main>
        </div>
      </div>
    </div>
  </ApolloProvider>
  )
}

export default App