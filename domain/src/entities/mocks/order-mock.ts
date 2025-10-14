import { faker } from '@faker-js/faker';
import { OrderStatus, PaymentMethod, type Order, type OrderStatusType, type PaymentMethodType } from '../order.js';
import { orderItemMock } from './orderItem-mock.js';
import { userMock } from './user-mock.js';

export function orderMock(opts?: Partial<Order>): Order {
    const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => orderItemMock());
    const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    return {
        id: crypto.randomUUID(),
        customerName: faker.person.fullName(),
        items,
        createdBy: userMock(),
        status: faker.helpers.arrayElement(Object.values(OrderStatus)) as OrderStatusType,
        paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)) as PaymentMethodType,
        total,
        createdAt: new Date(),
        completedAt: faker.date.recent(),
        ...opts,
    };
}
