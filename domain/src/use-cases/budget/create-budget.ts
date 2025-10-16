import type { Budget } from '@domain/entities/budget.js';
import type { OrderItem } from '@domain/entities/orderItem.js';
import type { User } from '@domain/entities/user.js';
import type { BudgetService } from '@domain/services/budget-service.js';

interface CreateBudgetDeps {
    budgetService: BudgetService;
}

interface CreateBudgetPayload {
    clientName: string;
    items: OrderItem[];
    createdBy?: User;
    validDays?: number; // Por defecto, 7 días
}

export async function createBudget({ budgetService }: CreateBudgetDeps, payload: CreateBudgetPayload): Promise<Budget | Error> {
    if (!payload.items || payload.items.length === 0) {
        return new Error('Budget must contain at least one item');
    }

    const total = payload.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + (payload.validDays ?? 7));

    const newBudget: Budget = {
        id: crypto.randomUUID(),
        clientName: payload.clientName,
        items: payload.items,
        total,
        createdAt: new Date(),
        validUntil,
        ...(payload.createdBy ? { createdBy: payload.createdBy } : {}),
    };

    await budgetService.save(newBudget);
    return newBudget;
}
