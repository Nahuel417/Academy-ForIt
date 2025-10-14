import type { Entity } from '../utils/types/entity.js';
import type { OrderItem } from './orderItem.js';
import type { User } from './user.js';

export interface Budget extends Entity {
    clientName: string;
    items: OrderItem[];
    createdBy?: User;
    createdAt: Date;
    total: number;
    validUntil?: Date;
}
