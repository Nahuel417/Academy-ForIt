import type { Order } from '@domain/entities/order.js';
import type { OrderService } from '@domain/services/order-service.js';

interface GetOrderByIdDeps {
    orderService: OrderService;
}

interface GetOrderByIdPayload {
    id: string;
}

export async function getOrderById({ orderService }: GetOrderByIdDeps, { id }: GetOrderByIdPayload): Promise<Order | Error> {
    const order = await orderService.findById(id);

    if (!order) return new Error('Order not found');
    return order;
}
