import type { Budget } from '@domain/entities/budget.js';

export const calculateBudgetTotal = async (_deps: unknown, budget: Budget): Promise<number> => {
    const total = budget.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    return total;
};
