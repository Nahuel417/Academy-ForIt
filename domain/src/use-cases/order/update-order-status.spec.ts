import { describe, test, expect, beforeEach } from 'vitest';
import { updateOrderStatus } from './update-order-status.js';
import { MockedOrderService } from '@domain/services/mocks/mock-order-service.js';

describe('updateOrderStatus use-case', () => {
    let orderService: MockedOrderService;

    beforeEach(() => {
        orderService = new MockedOrderService([
            {
                id: '1',
                customerName: 'Nahuel',
                items: [],
                status: 'PENDING',
                paymentMethod: 'CASH',
                total: 0,
                createdAt: new Date(),
            },
        ]);
    });

    test('should update the order status to COMPLETED and set completedAt', async () => {
        const result = await updateOrderStatus({ orderService }, { orderId: '1', status: 'COMPLETED' });

        if (result instanceof Error) throw result;

        expect(result.status).toBe('COMPLETED');
        expect(result.completedAt).toBeInstanceOf(Date);
    });

    test('should return error if order not found', async () => {
        const result = await updateOrderStatus({ orderService }, { orderId: '999', status: 'COMPLETED' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Order not found');
    });
});
