import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4V7" />
    </svg>
);

const LayoutDashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
    </svg>
);

const LogOutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" x2="9" y1="12" y2="12"></line>
    </svg>
);


const NavItem: React.FC<{ icon: React.ReactNode, children: React.ReactNode, active?: boolean }> = ({ icon, children, active }) => (
    <a 
        href="#" 
        onClick={(e) => e.preventDefault()}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${active ? 'bg-blue-600 text-white shadow-md cursor-default' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
    >
        {icon}
        <span>{children}</span>
    </a>
)

const SideNav: React.FC = () => {
    const { logout } = useAppContext();

    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col dark:bg-slate-900 dark:border-slate-700">
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                    <PackageIcon className="w-7 h-7 text-blue-600" />
                    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">DeliveryHub</h1>
                </div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavItem icon={<LayoutDashboardIcon className="w-5 h-5" />} active>
                    Dashboard
                </NavItem>
            </nav>
            <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
                 <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors duration-200"
                >
                    <LogOutIcon className="w-5 h-5"/>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default SideNav;