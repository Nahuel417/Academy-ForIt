import { describe, test, expect, beforeEach } from 'vitest';
import type { Budget } from '@domain/entities/budget.js';
import { MockedBudgetService } from '@domain/services/mocks/mock-budget-service.js';
import { createBudget } from './create-budget.js';

describe('createBudget use-case', () => {
    let budgetService: MockedBudgetService;

    beforeEach(() => {
        budgetService = new MockedBudgetService([]);
    });

    test('should create a new budget and calculate total', async () => {
        const items = [
            { product: { id: 'p1', name: 'Laptop', price: 1000, categories: [], stock: 10, createdAt: new Date() }, quantity: 2, unitPrice: 1000 },
            { product: { id: 'p2', name: 'Mouse', price: 100, categories: [], stock: 20, createdAt: new Date() }, quantity: 1, unitPrice: 100 },
        ];

        const result = await createBudget({ budgetService }, { clientName: 'Nahuel', items });

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('total', 2100);
        expect(result).toHaveProperty('validUntil');
        expect(result).toHaveProperty('createdAt');
    });

    test('should return error if no items are provided', async () => {
        const result = await createBudget({ budgetService }, { clientName: 'Nahuel', items: [] });
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Budget must contain at least one item');
    });

    test('should assign a custom validity period if provided', async () => {
        const items = [{ product: { id: 'p1', name: 'Laptop', price: 1000, categories: [], stock: 10, createdAt: new Date() }, quantity: 1, unitPrice: 1000 }];

        const result = await createBudget({ budgetService }, { clientName: 'Nahuel', items, validDays: 3 });
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 3);

        expect((result as Budget).validUntil?.getDate()).toBe(expectedDate.getDate());
    });
});
