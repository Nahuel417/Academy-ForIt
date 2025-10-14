import { describe, test, expect, beforeEach } from 'vitest';
import { getOrderById } from './get-order-id.js';
import { MockedOrderService } from '@domain/services/mocks/mock-order-service.js';

describe('getOrderById use-case', () => {
    let orderService: MockedOrderService;

    beforeEach(() => {
        orderService = new MockedOrderService([{ id: '1', customerName: 'Nahuel', items: [], status: 'PENDING', paymentMethod: 'CASH', total: 0, createdAt: new Date() }]);
    });

    test('should return the order if found', async () => {
        const result = await getOrderById({ orderService }, { id: '1' });

        if (result instanceof Error) throw result;

        expect(result.id).toBe('1');
    });

    test('should return error if order not found', async () => {
        const result = await getOrderById({ orderService }, { id: '999' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Order not found');
    });
});
