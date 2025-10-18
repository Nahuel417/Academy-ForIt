import type { CashRegister } from '@domain/entities/cashRegister.js';

export const calculateCashRegisterTotals = async (_deps: unknown, register: CashRegister): Promise<CashRegister> => {
    // total de ventas sumando cada orden
    register.totalSales = register.orders.reduce((sum, order) => {
        const orderTotal = order.items.reduce((s, item) => s + item.quantity * item.unitPrice, 0);
        return sum + orderTotal;
    }, 0);

    // total de movimientos sumando amount
    register.totalMovements = register.movements.reduce((sum, m) => sum + m.amount, 0);

    // monto final
    register.finalAmount = register.initialAmount + register.totalSales + register.totalMovements;

    return register;
};
