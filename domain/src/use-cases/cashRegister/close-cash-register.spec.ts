// close-cash-register.spec.ts
import { describe, test, expect, beforeEach } from 'vitest';
import { closeCashRegister } from './close-cash-register.js';
import { MockedCashRegisterService } from '@domain/services/mocks/mock-cashRegister-service.js';
import { OrderStatus, PaymentMethod } from '@domain/entities/order.js';

describe('closeCashRegister use-case', () => {
    let cashRegisterService: MockedCashRegisterService;
    let registerId: string;

    beforeEach(async () => {
        cashRegisterService = new MockedCashRegisterService();

        const register = {
            id: 'r1',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 1000,
            orders: [
                {
                    id: 'o1',
                    customerName: 'Nahuel',
                    items: [],
                    status: OrderStatus.COMPLETED,
                    paymentMethod: PaymentMethod.CASH,
                    total: 200,
                    createdAt: new Date(),
                },
                {
                    id: 'o2',
                    customerName: 'Ana',
                    items: [],
                    status: OrderStatus.PENDING,
                    paymentMethod: PaymentMethod.CARD,
                    total: 300,
                    createdAt: new Date(),
                },
            ],
            movements: [
                { description: 'Gasto extra', amount: -50 },
                { description: 'Ingreso extra', amount: 150 },
            ],
            totalSales: 0,
            totalMovements: 100, // -50 + 150
            finalAmount: 1100, // initial + movements
        };

        await cashRegisterService.save(register);
        registerId = register.id;
    });

    test('should close cash register and calculate totals correctly', async () => {
        const result = await closeCashRegister({ cashRegisterService }, { registerId });

        expect(result.closedAt).toBeInstanceOf(Date);
        expect(result.totalSales).toBe(200); // solo COMPLETED
        expect(result.finalAmount).toBe(200 + 100 + 1000); // totalSales + totalMovements + initialAmount
    });

    test('should throw error if cash register not found', async () => {
        await expect(closeCashRegister({ cashRegisterService }, { registerId: 'nonexistent' })).rejects.toThrow('Cash register not found');
    });

    test('should throw error if cash register already closed', async () => {
        // cierro primero
        await closeCashRegister({ cashRegisterService }, { registerId });

        await expect(closeCashRegister({ cashRegisterService }, { registerId })).rejects.toThrow('Cash register already closed');
    });

    test('should handle cash register with no orders', async () => {
        // creo uno nuevo sin órdenes
        const emptyRegister = {
            id: 'r2',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 500,
            orders: [],
            movements: [],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 500,
        };
        await cashRegisterService.save(emptyRegister);

        const result = await closeCashRegister({ cashRegisterService }, { registerId: 'r2' });

        expect(result.totalSales).toBe(0);
        expect(result.finalAmount).toBe(500);
        expect(result.closedAt).toBeInstanceOf(Date);
    });
});
