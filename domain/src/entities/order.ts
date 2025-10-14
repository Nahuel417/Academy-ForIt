import type { Entity } from '../utils/types/entity.js';
import type { OrderItem } from './orderItem.js';
import type { User } from './user.js';

export const OrderStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
    CASH: 'CASH',
    TRANSFER: 'TRANSFER',
    CARD: 'CARD',
} as const;

export type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export interface Order extends Entity {
    customerName: string;
    items: OrderItem[];
    createdBy?: User;
    status: OrderStatusType;
    paymentMethod: PaymentMethodType;
    virtualWallet?: string;
    total: number;
    createdAt: Date;
    completedAt?: Date;
}
