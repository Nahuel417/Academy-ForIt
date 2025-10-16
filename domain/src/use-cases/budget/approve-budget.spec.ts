import { MockedBudgetService } from '@domain/services/mocks/mock-budget-service.js';
import { MockedOrderService } from '@domain/services/mocks/mock-order-service.js';
import { describe, test, expect, beforeEach } from 'vitest';
import { approveBudget } from './approve-budget.js';

describe('approveBudget use-case', () => {
    let budgetService: MockedBudgetService;
    let orderService: MockedOrderService;

    beforeEach(() => {
        budgetService = new MockedBudgetService([
            {
                id: 'b1',
                clientName: 'Nahuel',
                items: [
                    {
                        product: { id: 'p1', name: 'Laptop', price: 1000, categories: [], stock: 10, createdAt: new Date() },
                        quantity: 1,
                        unitPrice: 1000,
                    },
                ],
                total: 1000,
                createdAt: new Date(),
            },
        ]);
        orderService = new MockedOrderService([]);
    });

    test('should create an order from an existing budget', async () => {
        const result = await approveBudget({ budgetService, orderService }, { budgetId: 'b1', paymentMethod: 'CASH' });

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('customerName', 'Nahuel');
        expect(result).toHaveProperty('total', 1000);
        expect(result).toHaveProperty('status', 'PENDING');
    });

    test('should return error if budget not found', async () => {
        const result = await approveBudget({ budgetService, orderService }, { budgetId: 'invalid', paymentMethod: 'CASH' });
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Budget not found');
    });
});
