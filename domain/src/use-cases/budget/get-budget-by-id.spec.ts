import { describe, test, expect, beforeEach } from 'vitest';
import { getBudgetById } from './get-budget-by-id.js';
import { MockedBudgetService } from '../../services/mocks/mock-budget-service.js';

describe('getBudgetById use-case', () => {
    let budgetService: MockedBudgetService;

    beforeEach(() => {
        budgetService = new MockedBudgetService([{ id: 'b1', clientName: 'Nahuel', items: [], total: 0, createdAt: new Date() }]);
    });

    test('should return a budget by id', async () => {
        const result = await getBudgetById({ budgetService }, { id: 'b1' });

        expect(result).toHaveProperty('id', 'b1');
        expect(result).toHaveProperty('clientName', 'Nahuel');
    });

    test('should return error if budget not found', async () => {
        const result = await getBudgetById({ budgetService }, { id: 'not-exists' });
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Budget not found');
    });
});
