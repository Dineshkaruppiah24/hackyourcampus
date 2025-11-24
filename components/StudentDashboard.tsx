import React, { useState, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Order, OrderCategory, OrderStatus } from '../types';

const OrderForm: React.FC = () => {
    const { user, addOrder } = useAppContext();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderName, setOrderName] = useState('');
    const [orderCategory, setOrderCategory] = useState<OrderCategory>(OrderCategory.SHOPPING);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phoneNumber || !orderName || !user) return;

        addOrder({
            name,
            registerNumber: user.id,
            phoneNumber,
            orderName,
            orderCategory,
        });
        
        setName('');
        setPhoneNumber('');
        setOrderName('');
        setOrderCategory(OrderCategory.SHOPPING);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    if (!user) return null;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Register a New Parcel</h2>
            {isSubmitted && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300 p-4 mb-6 rounded-md" role="alert">
                    <p className="font-bold">Success!</p>
                    <p>Your order has been registered successfully.</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label htmlFor="registerNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Register Number</label>
                    <input type="text" id="registerNumber" value={user.id} readOnly className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 dark:border-slate-700 border border-slate-300 rounded-md shadow-sm cursor-not-allowed"/>
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                    <input type="tel" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label htmlFor="orderName" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Order/Parcel Name</label>
                    <input type="text" id="orderName" value={orderName} onChange={e => setOrderName(e.target.value)} placeholder="e.g., Amazon Electronics" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 dark:text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="orderCategory" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Category</label>
                    <select id="orderCategory" value={orderCategory} onChange={e => setOrderCategory(e.target.value as OrderCategory)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {Object.values(OrderCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
};

const StudentOrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {

    const getStatusChip = (status: OrderStatus) => {
        const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
        switch (status) {
            case OrderStatus.PENDING: return <span className={`${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300`}>Pending</span>;
            case OrderStatus.DELIVERED: return <span className={`${baseClasses} bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300`}>Reached Hub</span>;
            case OrderStatus.PICKED: return <span className={`${baseClasses} bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300`}>Picked Up</span>;
            default: return <span className={`${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300`}>Unknown</span>;
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                        {['Token', 'Order Name', 'Category', 'Status', 'Submitted', 'Picked Up'].map(head => (
                            <th key={head} scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {orders.length === 0 ? (
                         <tr>
                            <td colSpan={6} className="text-center py-10 text-slate-500 dark:text-slate-400">You have not registered any orders yet.</td>
                        </tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order.tokenNumber} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-700 dark:text-slate-300">{order.tokenNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.orderName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.orderCategory}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {getStatusChip(order.orderStatus)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.submittedTime.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{order.pickupTime ? order.pickupTime.toLocaleString() : 'N/A'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const StudentDashboard: React.FC = () => {
    const { user, orders } = useAppContext();
    
    const studentOrders = useMemo(() => {
        if (!user) return [];
        return orders.filter(order => order.registerNumber === user.id);
    }, [orders, user]);

    return (
        <div className="space-y-8">
            <OrderForm />
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">My Orders</h2>
                <StudentOrdersTable orders={studentOrders} />
            </div>
        </div>
    );
};

export default StudentDashboard;