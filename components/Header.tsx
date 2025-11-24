import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.716 7.716 0 0112 15c1.527 0 2.943.464 4.145 1.272A7.711 7.711 0 0112 19.5a7.711 7.711 0 01-5.855-2.688zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zm-11.45 11.45a.75.75 0 011.06 0l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.061zM4.106 6.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.06L4.106 7.167a.75.75 0 010-1.06zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18.75a.75.75 0 01.75-.75z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.472-.948.75.75 0 01.82.161l.75.75a.75.75 0 01-.82.82A10.5 10.5 0 0118 18a10.5 10.5 0 01-10.5-10.5 10.5 10.5 0 014.819-8.472l.75.75a.75.75 0 01.819.162z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC = () => {
    const { user, logout, theme, toggleTheme } = useAppContext();

    return (
        <header className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-700">
            <div className="px-4 md:px-8 py-4 flex justify-between items-center">
                <div>
                     <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
                     <p className="text-sm text-slate-500 dark:text-slate-400">
                        Welcome back, {user?.id}!
                     </p>
                </div>
               
                <div className="flex items-center space-x-4">
                     <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                    </button>
                     <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center dark:bg-slate-700">
                             <UserIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                             <div className="font-semibold text-slate-700 capitalize dark:text-slate-200">{user?.role}</div>
                             <div className="text-xs text-slate-500 dark:text-slate-400">{user?.id}</div>
                        </div>
                    </div>
                     <button
                        onClick={logout}
                        className="bg-slate-100 text-slate-600 font-semibold text-sm py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-500 dark:hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;