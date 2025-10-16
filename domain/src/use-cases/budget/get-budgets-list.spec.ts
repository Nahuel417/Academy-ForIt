import { describe, test, expect, beforeEach } from 'vitest';
import { getBudgetsList } from './get-budgets-list.js';
import { MockedBudgetService } from '../../services/mocks/mock-budget-service.js';

describe('getBudgetsList use-case', () => {
    let budgetService: MockedBudgetService;

    beforeEach(() => {
        budgetService = new MockedBudgetService([
            { id: '1', clientName: 'Nahuel', items: [], total: 1000, createdAt: new Date('2024-01-10') },
            { id: '2', clientName: 'Lucía', items: [], total: 1500, createdAt: new Date('2024-02-10') },
        ]);
    });

    test('should return all budgets if no filters are applied', async () => {
        const result = await getBudgetsList({ budgetService });
        expect(result).toHaveLength(2);
    });

    test('should filter by client name', async () => {
        const result = await getBudgetsList({ budgetService }, { clientName: 'luc' });
        expect(result).toHaveLength(1);
        expect(result[0]?.clientName).toBe('Lucía');
    });

    test('should filter by date range', async () => {
        const result = await getBudgetsList({ budgetService }, { fromDate: new Date('2024-01-15'), toDate: new Date('2024-02-15') });
        expect(result).toHaveLength(1);
        expect(result[0]?.clientName).toBe('Lucía');
    });
});
