import type { Order, OrderStatusType, PaymentMethodType } from '@domain/entities/order.js';
import type { OrderService } from '@domain/services/order-service.js';
import type { BudgetService } from '@domain/services/budget-service.js';

interface ApproveBudgetDeps {
    budgetService: BudgetService;
    orderService: OrderService;
}

interface ApproveBudgetPayload {
    budgetId: string;
    paymentMethod: PaymentMethodType;
}

export async function approveBudget({ budgetService, orderService }: ApproveBudgetDeps, { budgetId, paymentMethod }: ApproveBudgetPayload): Promise<Order | Error> {
    const budget = await budgetService.findById(budgetId);

    if (!budget) return new Error('Budget not found');

    const newOrder: Order = {
        id: crypto.randomUUID(),
        customerName: budget.clientName,
        items: budget.items,
        status: 'PENDING' as OrderStatusType,
        paymentMethod,
        total: budget.total,
        createdAt: new Date(),
        ...(budget.createdBy ? { createdBy: budget.createdBy } : {}),
    };

    await orderService.save(newOrder);
    return newOrder;
}
