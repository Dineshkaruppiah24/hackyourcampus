import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Order, User, OrderStatus, OrderCategory } from '../types';

interface AppContextType {
    user: User | null;
    orders: Order[];
    theme: 'light' | 'dark';
    login: (id: string, role: 'student' | 'admin') => void;
    logout: () => void;
    addOrder: (newOrderData: Omit<Order, 'tokenNumber' | 'orderStatus' | 'submittedTime' | 'pickupTime'>) => void;
    updateOrderStatus: (tokenNumber: string, newStatus: OrderStatus) => void;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>(() => {
        // Initialize with some dummy data for demonstration
        const now = new Date();
        return [
            {
                tokenNumber: 'T' + (now.getTime() - 200000),
                name: 'Alice Johnson',
                registerNumber: 'S001',
                phoneNumber: '555-0101',
                orderName: 'Amazon Book',
                orderCategory: OrderCategory.SHOPPING,
                orderStatus: OrderStatus.DELIVERED,
                submittedTime: new Date(now.getTime() - 86400000), // 1 day ago
                pickupTime: null,
            },
            {
                tokenNumber: 'T' + (now.getTime() - 100000),
                name: 'Bob Williams',
                registerNumber: 'S002',
                phoneNumber: '555-0102',
                orderName: 'Pizza Hut',
                orderCategory: OrderCategory.FOOD,
                orderStatus: OrderStatus.PENDING,
                submittedTime: new Date(now.getTime() - 3600000), // 1 hour ago
                pickupTime: null,
            }
        ];
    });

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const login = (id: string, role: 'student' | 'admin') => {
        setUser({ id, role });
    };

    const logout = () => {
        setUser(null);
    };

    const addOrder = useCallback((newOrderData: Omit<Order, 'tokenNumber' | 'orderStatus' | 'submittedTime' | 'pickupTime'>) => {
        const newOrder: Order = {
            ...newOrderData,
            tokenNumber: 'T' + Date.now(),
            orderStatus: OrderStatus.PENDING,
            submittedTime: new Date(),
            pickupTime: null,
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);
    }, []);

    const updateOrderStatus = useCallback((tokenNumber: string, newStatus: OrderStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order => {
                if (order.tokenNumber === tokenNumber) {
                    return {
                        ...order,
                        orderStatus: newStatus,
                        pickupTime: newStatus === OrderStatus.PICKED ? new Date() : order.pickupTime,
                    };
                }
                return order;
            })
        );
    }, []);

    return (
        <AppContext.Provider value={{ user, orders, theme, login, logout, addOrder, updateOrderStatus, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};