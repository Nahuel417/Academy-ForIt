import { describe, test, expect } from 'vitest';
import type { Budget } from '@domain/entities/budget.js';
import { calculateBudgetTotal } from './calculate-budget-total.js';

describe('calculateBudgetTotal use-case', () => {
    const mockBudget: Budget = {
        id: 'b1',
        clientName: 'Cliente Test',
        items: [
            { product: { id: 'p1', name: 'Producto 1', price: 100, stock: 10, categories: [], createdAt: new Date() }, quantity: 2, unitPrice: 100 },
            { product: { id: 'p2', name: 'Producto 2', price: 50, stock: 5, categories: [], createdAt: new Date() }, quantity: 1, unitPrice: 50 },
        ],
        createdAt: new Date(),
        total: 0,
    };

    test('should calculate total correctly for multiple items', async () => {
        const total = await calculateBudgetTotal({}, mockBudget);
        expect(total).toBe(250); // 2*100 + 1*50
    });

    test('should return 0 if budget has no items', async () => {
        const emptyBudget: Budget = { ...mockBudget, id: 'b2', items: [], total: 0 };
        const total = await calculateBudgetTotal({}, emptyBudget);
        expect(total).toBe(0);
    });

    test('should handle decimal prices correctly', async () => {
        const item = mockBudget.items[0];
        if (!item) throw new Error('No hay items en el presupuesto');

        const decimalBudget: Budget = {
            ...mockBudget,
            id: 'b3',
            items: [{ product: item.product, quantity: 3, unitPrice: 99.99 }],
        };
        const total = await calculateBudgetTotal({}, decimalBudget);
        expect(total).toBeCloseTo(299.97, 2);
    });

    test('should correctly handle mixed quantities and unit prices', async () => {
        const item1 = mockBudget.items[0];
        const item2 = mockBudget.items[1];
        if (!item1) throw new Error('No hay items en el presupuesto');
        if (!item2) throw new Error('No hay items en el presupuesto');

        const mixedBudget: Budget = {
            ...mockBudget,
            id: 'b4',
            items: [
                { product: item1.product, quantity: 1, unitPrice: 49.5 },
                { product: item2.product, quantity: 4, unitPrice: 25.25 },
            ],
        };
        const total = await calculateBudgetTotal({}, mixedBudget);
        expect(total).toBeCloseTo(49.5 + 4 * 25.25, 2);
    });
});
