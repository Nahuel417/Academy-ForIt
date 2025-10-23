// @ts-ignore
import type { Order } from 'demo-domain';
// @ts-ignore
import type { OrderService } from 'demo-domain';

export class OrderRepositoryMemory implements OrderService {
    private orders: Order[] = [];

    async findById(id: string): Promise<Order | undefined> {
        return this.orders.find((order) => order.id === id);
    }

    async findAll(): Promise<Order[]> {
        return this.orders;
    }

    async findByCustomerName(name: string): Promise<Order[]> {
        return this.orders.filter((order) =>
            order.customerName.toLowerCase().includes(name.toLowerCase())
        );
    }

    async findByStatus(status: string): Promise<Order[]> {
        return this.orders.filter((order) => order.status === status);
    }

    async save(data: Order): Promise<void> {
        this.orders.push(data);
    }

    async editOne(data: Order): Promise<Order> {
        const index = this.orders.findIndex((order) => order.id === data.id);
        if (index !== -1) {
            this.orders[index] = data;
            return data;
        }
        throw new Error('Order not found');
    }

    async updateMany(data: Order[]): Promise<Order[] | undefined> {
        // Not implemented for simplicity
        return data;
    }

    async delete(id: string): Promise<void> {
        const index = this.orders.findIndex((order) => order.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
        }
    }
}
