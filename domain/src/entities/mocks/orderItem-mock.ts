import { faker } from '@faker-js/faker';
import type { OrderItem } from '../orderItem.js';
import { productMock } from './product-mock.js';

export function orderItemMock(opts?: Partial<OrderItem>): OrderItem {
    const product = productMock();
    const quantity = faker.number.int({ min: 1, max: 10 });
    return {
        product,
        quantity,
        unitPrice: product.price,
        ...opts,
    };
}
