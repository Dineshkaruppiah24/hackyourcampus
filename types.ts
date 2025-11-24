
export enum OrderCategory {
    FOOD = 'Food',
    COURIER = 'Courier',
    SHOPPING = 'Shopping',
}

export enum OrderStatus {
    PENDING = 'Pending',
    DELIVERED = 'Delivered / Reached Hub',
    PICKED = 'Picked',
}

export interface Order {
    tokenNumber: string;
    name: string;
    registerNumber: string;
    phoneNumber: string;
    orderName: string;
    orderCategory: OrderCategory;
    orderStatus: OrderStatus;
    submittedTime: Date;
    pickupTime: Date | null;
}

export type User = {
    id: string; // registerNumber for student, username for admin
    role: 'student' | 'admin';
}
