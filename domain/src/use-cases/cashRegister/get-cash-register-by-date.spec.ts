import { describe, test, expect, beforeEach } from 'vitest';
import type { CashRegister } from '@domain/entities/cashRegister.js';
import type { User } from '@domain/entities/user.js';
import { randomUUID } from 'crypto';
import { MockedCashRegisterService } from '@domain/services/mocks/mock-cashRegister-service.js';
import { getCashRegisterByDate } from './get-cash-register-by-date.js';

describe('getCashRegisterByDate use-case', () => {
    let cashRegisterService: MockedCashRegisterService;
    let today: Date;
    let register: CashRegister;
    let user: User;

    beforeEach(() => {
        cashRegisterService = new MockedCashRegisterService([]);

        user = {
            id: randomUUID(),
            email: 'test@test.com',
            password: '123456',
            role: 'EMPLOYEE',
            createdAt: new Date(),
        };

        today = new Date();

        register = {
            id: randomUUID(),
            date: today,
            openedBy: user,
            closedAt: undefined,
            initialAmount: 500,
            orders: [],
            movements: [],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 500,
        };

        cashRegisterService.save(register);
    });

    test('should return the cash register for the given date', async () => {
        const result = await getCashRegisterByDate({ cashRegisterService }, { date: today });

        expect(result).toBeDefined();
        expect(result?.id).toBe(register.id);
        expect(result?.initialAmount).toBe(500);
    });

    test('should return undefined if no register exists for the date', async () => {
        const anotherDate = new Date(today.getTime() - 86400000); // día anterior
        const result = await getCashRegisterByDate({ cashRegisterService }, { date: anotherDate });

        expect(result).toBeUndefined();
    });

    test('should return the correct register when multiple registers exist', async () => {
        const otherRegister: CashRegister = {
            id: randomUUID(),
            date: new Date(today.getTime() - 86400000), // día anterior
            openedBy: user,
            closedAt: undefined,
            initialAmount: 300,
            orders: [],
            movements: [],
            totalSales: 0,
            totalMovements: 0,
            finalAmount: 300,
        };
        await cashRegisterService.save(otherRegister);

        const resultToday = await getCashRegisterByDate({ cashRegisterService }, { date: today });
        const resultYesterday = await getCashRegisterByDate({ cashRegisterService }, { date: otherRegister.date });

        expect(resultToday?.id).toBe(register.id);
        expect(resultYesterday?.id).toBe(otherRegister.id);
    });

    test('should handle empty cash register service gracefully', async () => {
        const emptyService = new MockedCashRegisterService([]);
        const result = await getCashRegisterByDate({ cashRegisterService: emptyService }, { date: today });

        expect(result).toBeUndefined();
    });
});
