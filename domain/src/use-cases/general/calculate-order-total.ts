import type { Order } from '../../entities/order.js';

export const calculateOrderTotal = async (_deps: unknown, order: Order): Promise<number> => {
    const total = order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    return total;
};
