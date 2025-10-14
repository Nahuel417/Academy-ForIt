import { describe, test, expect, beforeEach } from 'vitest';
import { getOrderList } from './get-order-list.js';
import { MockedOrderService } from '@domain/services/mocks/mock-order-service.js';

describe('listOrders use-case', () => {
    let orderService: MockedOrderService;

    beforeEach(() => {
        orderService = new MockedOrderService([
            { id: '1', customerName: 'Nahuel', items: [], status: 'PENDING', paymentMethod: 'CASH', total: 0, createdAt: new Date() },
            { id: '2', customerName: 'Ana', items: [], status: 'COMPLETED', paymentMethod: 'CARD', total: 0, createdAt: new Date() },
        ]);
    });

    test('should return all orders if no filter', async () => {
        const result = await getOrderList({ orderService });

        expect(result).toHaveLength(2);
    });

    test('should filter by status', async () => {
        const result = await getOrderList({ orderService }, { status: 'COMPLETED' });

        expect(result).toHaveLength(1);
        expect(result[0]?.status).toBe('COMPLETED');
    });

    test('should filter by customer name', async () => {
        const result = await getOrderList({ orderService }, { customerName: 'Nah' });

        expect(result).toHaveLength(1);
        expect(result[0]?.customerName).toBe('Nahuel');
    });
});
