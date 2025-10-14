import { describe, test, expect, beforeEach } from 'vitest';
import { createOrder } from './create-order.js';
import { MockedOrderService } from '../../services/mocks/mock-order-service.js';

describe('createOrder use-case', () => {
    let orderService: MockedOrderService;

    beforeEach(() => {
        orderService = new MockedOrderService([]);
    });

    test('should create a new order with total calculated', async () => {
        const items = [
            {
                product: {
                    id: 'p1',
                    name: 'Laptop',
                    price: 1000,
                    stock: 10,
                    categories: [],
                    createdAt: new Date(),
                },
                quantity: 2,
                unitPrice: 1000,
            },
        ];

        const result = await createOrder({ orderService }, { customerName: 'Nahuel', items, paymentMethod: 'CASH' });

        if (result instanceof Error) throw result;

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('total', 2000);
        expect(result.status).toBe('PENDING');
    });

    test('should return error if no items provided', async () => {
        const result = await createOrder({ orderService }, { customerName: 'Nahuel', items: [], paymentMethod: 'CASH' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Order must have at least one item');
    });
});
