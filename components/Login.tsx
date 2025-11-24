import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';

const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4V7" />
    </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const Login: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
    const [registerNumber, setRegisterNumber] = useState('');
    const [adminUser, setAdminUser] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [error, setError] = useState('');

    const { login } = useAppContext();
    const { theme, toggleTheme } = useTheme();

    const handleStudentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (registerNumber.trim()) {
            login(registerNumber.trim().toUpperCase(), 'student');
        } else {
            setError('Please enter your register number.');
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // In a real app, this would be a secure API call.
        if (adminUser === 'admin' && adminPass === 'password') {
            login(adminUser, 'admin');
        } else {
            setError('Invalid admin credentials.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-rose-950 p-4">
            <div className="flex w-full max-w-5xl mx-auto bg-white dark:bg-rose-900 rounded-2xl shadow-2xl overflow-hidden relative">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-rose-800 text-gray-800 dark:text-rose-200 hover:bg-gray-300 dark:hover:bg-rose-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>

                {/* Left Panel */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white p-6">
                    <img 
                        src="/images/college-logo.png"
                        alt="M.Kumarasamy College banner"
                        className="max-w-full max-h-96 object-contain"
                    />
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-8">
                        <PackageIcon className="w-6 h-6 text-gray-800 dark:text-rose-200" />
                        <span className="font-semibold text-lg text-gray-800 dark:text-rose-200">College Delivery Hub</span>
                    </div>

                    <h2 className="font-serif text-4xl font-bold text-gray-800 dark:text-rose-100">Welcome Back</h2>
                    <p className="mt-2 text-gray-500 dark:text-rose-300">Please select your role to sign in.</p>

                    <div className="flex border-b border-gray-200 dark:border-rose-700 mt-8 mb-6">
                        <button 
                            onClick={() => { setActiveTab('student'); setError(''); }}
                            className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${activeTab === 'student' ? 'border-b-2 border-rose-500 text-gray-800 dark:text-rose-200' : 'text-gray-400 hover:text-gray-600 dark:text-rose-400 dark:hover:text-rose-300'}`}
                        >
                            STUDENT
                        </button>
                        <button 
                            onClick={() => { setActiveTab('admin'); setError(''); }}
                            className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${activeTab === 'admin' ? 'border-b-2 border-rose-500 text-gray-800 dark:text-rose-200' : 'text-gray-400 hover:text-gray-600 dark:text-rose-400 dark:hover:text-rose-300'}`}
                        >
                            ADMIN
                        </button>
                    </div>

                    {activeTab === 'student' && (
                        <form onSubmit={handleStudentLogin} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="registerNumber" className="block text-gray-700 dark:text-rose-300 text-sm font-medium mb-2">Register Number</label>
                                <input
                                    id="registerNumber"
                                    type="text"
                                    value={registerNumber}
                                    onChange={(e) => setRegisterNumber(e.target.value)}
                                    placeholder="e.g., S001"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-rose-800 border border-gray-200 dark:border-rose-700 dark:placeholder-rose-400 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    aria-label="Student Register Number"
                                />
                            </div>
                            <button type="submit" className="w-full bg-rose-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out mt-4">
                                Sign In
                            </button>
                        </form>
                    )}

                    {activeTab === 'admin' && (
                        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="adminUser" className="block text-gray-700 dark:text-rose-300 text-sm font-medium mb-2">Username</label>
                                <input
                                    id="adminUser"
                                    type="text"
                                    value={adminUser}
                                    onChange={(e) => setAdminUser(e.target.value)}
                                    placeholder="admin"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-rose-800 border border-gray-200 dark:border-rose-700 dark:placeholder-rose-400 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    aria-label="Admin Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="adminPass" className="block text-gray-700 dark:text-rose-300 text-sm font-medium mb-2">Password</label>
                                <input
                                    id="adminPass"
                                    type="password"
                                    value={adminPass}
                                    onChange={(e) => setAdminPass(e.target.value)}
                                    placeholder="password"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-rose-800 border border-gray-200 dark:border-rose-700 dark:placeholder-rose-400 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    aria-label="Admin Password"
                                />
                            </div>
                            <button type="submit" className="w-full bg-rose-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out mt-4">
                                Sign In
                            </button>
                        </form>
                    )}
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;