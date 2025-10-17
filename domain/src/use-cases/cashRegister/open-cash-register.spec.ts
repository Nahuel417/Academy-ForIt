import { MockedCashRegisterService } from '@domain/services/mocks/mock-cashRegister-service.js';
import { describe, test, expect, beforeEach } from 'vitest';
import { openCashRegister } from './open-cash-register.js';
import { UserRole } from '@domain/entities/user.js';

describe('openCashRegister use-case', () => {
    let cashRegisterService: MockedCashRegisterService;

    beforeEach(() => {
        cashRegisterService = new MockedCashRegisterService([]);
    });

    test('should open a new cash register with initial amount', async () => {
        const result = await openCashRegister({ cashRegisterService }, { initialAmount: 1000 });

        expect(result).toHaveProperty('id');
        expect(result.initialAmount).toBe(1000);
        expect(result.totalSales).toBe(0);
        expect(result.totalMovements).toBe(0);
        expect(result.finalAmount).toBe(1000);
        expect(result.closedAt).toBeUndefined();
    });

    test('should allow openedBy user to be set', async () => {
        const user = {
            id: 'u1',
            email: 'test@test.com',
            password: '123',
            role: UserRole.EMPLOYEE,
            createdAt: new Date(),
        };

        const result = await openCashRegister({ cashRegisterService }, { initialAmount: 500, openedBy: user });

        expect(result.openedBy).toEqual(user);
    });

    test('should throw error if register already exists for today', async () => {
        await openCashRegister({ cashRegisterService }, { initialAmount: 500 });

        await expect(openCashRegister({ cashRegisterService }, { initialAmount: 500 })).rejects.toThrow('Ya existe una caja abierta para esta fecha');
    });

    test('should have empty orders and movements on open', async () => {
        const result = await openCashRegister({ cashRegisterService }, { initialAmount: 0 });

        expect(result.orders).toHaveLength(0);
        expect(result.movements).toHaveLength(0);
    });

    test('finalAmount should equal initialAmount when no orders or movements', async () => {
        const result = await openCashRegister({ cashRegisterService }, { initialAmount: 1200 });
        expect(result.finalAmount).toBe(1200);
    });
});
