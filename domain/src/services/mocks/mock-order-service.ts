import type { Order } from '../../entities/order.js';
import type { OrderItem } from '../../entities/orderItem.js';
import type { OrderService } from '../order-service.js';

export class MockedOrderService implements OrderService {
    orders: Order[] = [];

    constructor(initialOrders: Order[] = []) {
        this.orders = initialOrders;
    }

    save = async (data: Order): Promise<void> => {
        this.orders.push(data);
    };

    findAll = async (): Promise<Order[]> => this.orders;

    findById = async (id: string): Promise<Order | undefined> => this.orders.find((o) => o.id === id);

    editOne = async (data: Order): Promise<Order> => {
        const index = this.orders.findIndex((o) => o.id === data.id);
        if (index === -1) throw new Error('Order not found');
        this.orders[index] = data;
        return this.orders[index];
    };

    updateMany = async (data: Order[]): Promise<Order[] | undefined> => {
        data.forEach((d) => {
            const index = this.orders.findIndex((o) => o.id === d.id);
            if (index !== -1) this.orders[index] = d;
        });
        return data;
    };

    delete = async (id: string): Promise<void> => {
        this.orders = this.orders.filter((o) => o.id !== id);
    };

    findByCustomerName = async (name: string): Promise<Order[]> => this.orders.filter((o) => o.customerName === name);

    findByStatus = async (status: string): Promise<Order[]> => this.orders.filter((o) => o.status === status);

    //  --- Métodos nuevos para manejar OrderItems ---
    addOrderItem = async (orderId: string, item: OrderItem): Promise<void> => {
        const order = this.orders.find((o) => o.id === orderId);
        if (!order) throw new Error('Order not found');
        if (!order.items) order.items = [];
        order.items.push(item);
    };

    removeOrderItem = async (orderId: string, productId: string): Promise<void> => {
        const order = this.orders.find((o) => o.id === orderId);
        if (!order) throw new Error('Order not found');
        order.items = order.items.filter((i) => i.product.id !== productId);
    };

    updateOrderItem = async (orderId: string, updatedItem: OrderItem): Promise<void> => {
        const order = this.orders.find((o) => o.id === orderId);
        if (!order) throw new Error('Order not found');
        const index = order.items.findIndex((i) => i.product.id === updatedItem.product.id);
        if (index === -1) throw new Error('Order item not found');
        order.items[index] = updatedItem;
    };
}
