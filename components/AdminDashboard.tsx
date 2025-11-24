import React, { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Order, OrderStatus } from '../types';

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    </div>
);

const PackageIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4V7" />
    </svg>
);

const ClockIcon = ({ className = "w-6 h-6" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const AdminOrdersTable: React.FC = () => {
    const { orders, updateOrderStatus } = useAppContext();

    const handleStatusChange = (token: string, newStatus: OrderStatus) => {
        updateOrderStatus(token, newStatus);
    };

    const getStatusSelectClasses = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING: return 'bg-amber-100 text-amber-800 border-amber-300 focus:ring-amber-500 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700';
            case OrderStatus.DELIVERED: return 'bg-sky-100 text-sky-800 border-sky-300 focus:ring-sky-500 dark:bg-sky-900/50 dark:text-sky-300 dark:border-sky-700';
            case OrderStatus.PICKED: return 'bg-emerald-100 text-emerald-800 border-emerald-300 focus:ring-emerald-500 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700';
            default: return 'bg-slate-100 text-slate-800 border-slate-300 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                        {['Token', 'Student Name', 'Reg No.', 'Order Name', 'Category', 'Status', 'Submitted'].map(head => (
                            <th key={head} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                     {orders.length === 0 ? (
                         <tr>
                            <td colSpan={7} className="text-center py-10 text-slate-500 dark:text-slate-400">No orders have been submitted yet.</td>
                        </tr>
                    ) : (
                        orders.map((order: Order) => (
                            <tr key={order.tokenNumber} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-700 dark:text-slate-300">{order.tokenNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.registerNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.orderName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.orderCategory}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select 
                                        value={order.orderStatus} 
                                        onChange={(e) => handleStatusChange(order.tokenNumber, e.target.value as OrderStatus)}
                                        className={`w-full text-xs font-semibold rounded-md p-2 border focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 ${getStatusSelectClasses(order.orderStatus)}`}
                                        aria-label={`Update status for order ${order.tokenNumber}`}
                                    >
                                        <option value={OrderStatus.PENDING}>Pending</option>
                                        <option value={OrderStatus.DELIVERED}>Reached Hub</option>
                                        <option value={OrderStatus.PICKED}>Picked Up</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.submittedTime.toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};


const AdminDashboard: React.FC = () => {
    const { orders } = useAppContext();

    const stats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(o => o.orderStatus === OrderStatus.PENDING).length;
        const picked = orders.filter(o => o.orderStatus === OrderStatus.PICKED).length;
        return { total, pending, picked };
    }, [orders]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Orders" value={stats.total} icon={<PackageIcon />} />
                <StatCard title="Pending Pickup" value={stats.pending} icon={<ClockIcon />} />
                <StatCard title="Orders Picked Up" value={stats.picked} icon={<CheckCircleIcon />} />
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">All Student Orders</h2>
                <AdminOrdersTable />
            </div>
        </div>
    );
};

export default AdminDashboard;