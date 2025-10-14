import { faker } from '@faker-js/faker';
import { userMock } from './user-mock.js';
import { orderMock } from './order-mock.js';
import type { CashRegisterMovement } from '../cashRegisterMovement.js';
import type { CashRegister } from '../cashRegister.js';

export function cashRegisterMock(opts?: Partial<CashRegister>): CashRegister {
    const orders = Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => orderMock());
    const movements: CashRegisterMovement[] = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
        description: faker.lorem.sentence(),
        amount: faker.number.int({ min: -50, max: 100 }),
    }));

    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const totalMovements = movements.reduce((sum, m) => sum + m.amount, 0);
    const initialAmount = faker.number.int({ min: 0, max: 200 });
    const finalAmount = initialAmount + totalSales + totalMovements;

    return {
        id: crypto.randomUUID(),
        date: new Date(),
        openedBy: userMock(),
        closedAt: faker.date.recent(),
        initialAmount,
        orders,
        movements,
        totalSales,
        totalMovements,
        finalAmount,
        ...opts,
    };
}
