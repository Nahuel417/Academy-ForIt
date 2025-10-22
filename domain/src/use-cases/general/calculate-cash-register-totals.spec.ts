import { describe, test, expect } from 'vitest';
import type { CashRegister } from '@domain/entities/cashRegister.js';
import { OrderStatus, PaymentMethod } from '@domain/entities/order.js';
import { calculateCashRegisterTotals } from './calculate-cash-register-totals.js';

describe('calculateCashRegisterTotals use-case', () => {
    const baseOrder = (id: string, total: number) => ({
        id,
        customerName: 'Cliente',
        items: [{ product: { id: 'p1', name: 'Prod', price: 100, stock: 5, categories: [], createdAt: new Date() }, quantity: total / 100, unitPrice: 100 }],
        status: OrderStatus.COMPLETED,
        paymentMethod: PaymentMethod.CASH,
        total,
        createdAt: new Date(),
    });

    test('should calculate totals with orders and movements', async () => {
        const register: CashRegister = {
            id: 'r1',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 500,
            orders: [baseOrder('o1', 200), baseOrder('o2', 300)],
            movements: [
                { description: 'Ingreso extra', amount: 50 },
                { description: 'Gasto', amount: -20 },
            ],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 0,
        };

        const updated = await calculateCashRegisterTotals({}, register);
        expect(updated.totalSales).toBe(500);
        expect(updated.totalMovements).toBe(30);
        expect(updated.finalAmount).toBe(1030);
    });

    test('should handle no orders', async () => {
        const register: CashRegister = {
            id: 'r2',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 100,
            orders: [],
            movements: [{ description: 'Ingreso', amount: 20 }],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 0,
        };

        const updated = await calculateCashRegisterTotals({}, register);
        expect(updated.totalSales).toBe(0);
        expect(updated.totalMovements).toBe(20);
        expect(updated.finalAmount).toBe(120);
    });

    test('should handle no movements', async () => {
        const register: CashRegister = {
            id: 'r3',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 100,
            orders: [baseOrder('o1', 150)],
            movements: [],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 0,
        };

        const updated = await calculateCashRegisterTotals({}, register);
        expect(updated.totalSales).toBe(150);
        expect(updated.totalMovements).toBe(0);
        expect(updated.finalAmount).toBe(250);
    });

    test('should handle empty orders and movements', async () => {
        const register: CashRegister = {
            id: 'r4',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 200,
            orders: [],
            movements: [],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 0,
        };

        const updated = await calculateCashRegisterTotals({}, register);
        expect(updated.totalSales).toBe(0);
        expect(updated.totalMovements).toBe(0);
        expect(updated.finalAmount).toBe(200);
    });
});
