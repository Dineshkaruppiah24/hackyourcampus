import React from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import SideNav from './components/SideNav';

const AppContent: React.FC = () => {
    const { user } = useAppContext();

    if (!user) {
        return <Login />;
    }

    return (
        <div className="flex h-screen bg-slate-50 text-gray-800 dark:bg-slate-900 dark:text-slate-200">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8 dark:bg-slate-900">
                    {user.role === 'admin' ? (
                        <AdminDashboard />
                    ) : (
                        <StudentDashboard />
                    )}
                </main>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;