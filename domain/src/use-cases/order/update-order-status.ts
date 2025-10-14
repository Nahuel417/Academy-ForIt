import type { Order, OrderStatusType } from '@domain/entities/order.js';
import type { OrderService } from '@domain/services/order-service.js';

interface UpdateOrderStatusDeps {
    orderService: OrderService;
}

interface UpdateOrderStatusPayload {
    orderId: string;
    status: OrderStatusType;
}

export async function updateOrderStatus({ orderService }: UpdateOrderStatusDeps, { orderId, status }: UpdateOrderStatusPayload): Promise<Order | Error> {
    const order = await orderService.findById(orderId);
    if (!order) return new Error('Order not found');

    order.status = status;
    if (status === 'COMPLETED') {
        order.completedAt = new Date();
    }

    const updated = await orderService.editOne(order);
    return updated;
}
