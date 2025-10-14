import type { OrderService } from '../../services/order-service.js';
import type { OrderItem } from '../../entities/orderItem.js';
import type { User } from '@domain/entities/user.js';
import type { Order, OrderStatusType, PaymentMethodType } from '@domain/entities/order.js';

interface CreateOrderDeps {
    orderService: OrderService;
}

interface CreateOrderPayload {
    customerName: string;
    items: OrderItem[];
    paymentMethod: PaymentMethodType;
    createdBy?: User;
}

export async function createOrder({ orderService }: CreateOrderDeps, payload: CreateOrderPayload): Promise<Order | Error> {
    if (!payload.items || payload.items.length === 0) {
        return new Error('Order must have at least one item');
    }

    const total = payload.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    const newOrder: Order = {
        id: crypto.randomUUID(),
        customerName: payload.customerName,
        items: payload.items,
        status: 'PENDING' as OrderStatusType,
        paymentMethod: payload.paymentMethod,
        total,
        createdAt: new Date(),
        ...(payload.createdBy ? { createdBy: payload.createdBy } : {}),
    };

    await orderService.save(newOrder);
    return newOrder;
}
