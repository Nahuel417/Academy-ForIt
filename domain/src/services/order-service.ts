import type { Order } from '../entities/order.js';
import type { Service } from '../utils/types/service.js';

export interface OrderService extends Service<Order> {
    findByCustomerName(name: string): Promise<Order[]>;
    findByStatus(status: string): Promise<Order[]>;
}
