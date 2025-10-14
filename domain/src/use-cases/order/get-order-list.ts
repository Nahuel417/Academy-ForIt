import type { Order } from '@domain/entities/order.js';
import type { OrderService } from '@domain/services/order-service.js';

interface ListOrdersDeps {
    orderService: OrderService;
}

interface ListOrdersPayload {
    status?: string;
    customerName?: string;
}

export async function getOrderList({ orderService }: ListOrdersDeps, filters?: ListOrdersPayload): Promise<Order[]> {
    let orders = await orderService.findAll();

    if (filters?.status) {
        orders = orders.filter((o) => o.status === filters.status);
    }

    if (filters?.customerName) {
        orders = orders.filter((o) => o.customerName.includes(filters.customerName!));
    }

    return orders;
}
