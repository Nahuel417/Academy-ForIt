import type { Budget } from '@domain/entities/budget.js';
import type { BudgetService } from '@domain/services/budget-service.js';

interface GetBudgetByIdDeps {
    budgetService: BudgetService;
}

interface GetBudgetByIdPayload {
    id: string;
}

export async function getBudgetById({ budgetService }: GetBudgetByIdDeps, { id }: GetBudgetByIdPayload): Promise<Budget | Error> {
    const budget = await budgetService.findById(id);

    if (!budget) return new Error('Budget not found');
    return budget;
}
