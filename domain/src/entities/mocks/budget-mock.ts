import type { Budget } from '../budget.js';
import { orderItemMock } from './orderItem-mock.js';
import { userMock } from './user-mock.js';
import { faker } from '@faker-js/faker';

export function budgetMock(opts?: Partial<Budget>): Budget {
    const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => orderItemMock());
    const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    return {
        id: crypto.randomUUID(),
        clientName: faker.person.fullName(),
        items,
        createdBy: userMock(),
        total,
        createdAt: new Date(),
        validUntil: faker.date.soon({ days: 30 }),
        ...opts,
    };
}
