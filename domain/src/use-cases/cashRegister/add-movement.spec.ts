import { MockedCashRegisterService } from '@domain/services/mocks/mock-cashRegister-service.js';
import { describe, test, expect, beforeEach } from 'vitest';

describe('CashRegister movements', () => {
    let cashRegisterService: MockedCashRegisterService;
    let registerId: string;

    beforeEach(async () => {
        cashRegisterService = new MockedCashRegisterService([]);
        const register = {
            id: 'r1',
            date: new Date(),
            openedBy: undefined,
            closedAt: undefined,
            initialAmount: 1000,
            orders: [],
            movements: [],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 1000,
        };
        await cashRegisterService.save(register as any);
        registerId = 'r1';
    });

    test('should add a movement and update totals', async () => {
        await cashRegisterService.addMovement(registerId, { description: 'Ingreso extra', amount: 200 });

        const register = await cashRegisterService.findById(registerId);
        expect(register?.movements).toHaveLength(1);
        expect(register?.totalMovements).toBe(200);
        expect(register?.finalAmount).toBe(1200);
    });

    test('should add multiple movements correctly', async () => {
        await cashRegisterService.addMovement(registerId, { description: 'Ingreso', amount: 100 });
        await cashRegisterService.addMovement(registerId, { description: 'Gasto', amount: -50 });

        const register = await cashRegisterService.findById(registerId);
        expect(register?.movements).toHaveLength(2);
        expect(register?.totalMovements).toBe(50);
        expect(register?.finalAmount).toBe(1050);
    });

    test('should update an existing movement', async () => {
        await cashRegisterService.addMovement(registerId, { description: 'Ingreso', amount: 100 });
        await cashRegisterService.updateMovement(registerId, { description: 'Ingreso', amount: 150 });

        const register = await cashRegisterService.findById(registerId);
        expect(register?.movements).toHaveLength(1);
        expect(register?.movements[0]?.amount ?? 0).toBe(150);
        expect(register?.totalMovements).toBe(150);
        expect(register?.finalAmount).toBe(1150);
    });

    test('should remove a movement and recalc totals', async () => {
        await cashRegisterService.addMovement(registerId, { description: 'Ingreso', amount: 100 });
        await cashRegisterService.removeMovement(registerId, 'Ingreso');

        const register = await cashRegisterService.findById(registerId);
        expect(register?.movements).toHaveLength(0);
        expect(register?.totalMovements).toBe(0);
        expect(register?.finalAmount).toBe(1000);
    });
});
