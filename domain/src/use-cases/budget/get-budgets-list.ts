import type { Budget } from '@domain/entities/budget.js';
import type { BudgetService } from '@domain/services/budget-service.js';

interface ListBudgetsDeps {
    budgetService: BudgetService;
}

interface ListBudgetsFilters {
    clientName?: string;
    fromDate?: Date;
    toDate?: Date;
}

export async function getBudgetsList({ budgetService }: ListBudgetsDeps, filters?: ListBudgetsFilters): Promise<Budget[]> {
    let budgets = await budgetService.findAll();

    if (filters?.clientName) {
        budgets = budgets.filter((b) => b.clientName.toLowerCase().includes(filters.clientName!.toLowerCase()));
    }

    if (filters?.fromDate) {
        budgets = budgets.filter((b) => b.createdAt >= filters.fromDate!);
    }

    if (filters?.toDate) {
        budgets = budgets.filter((b) => b.createdAt <= filters.toDate!);
    }

    return budgets;
}
