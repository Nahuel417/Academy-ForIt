import type { Product } from '../product.js';
import { faker } from '@faker-js/faker';
import { categoryMock } from './category-mock.js';

export function productMock(opts?: Partial<Product>): Product {
    const categories = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => categoryMock());

    return {
        id: crypto.randomUUID(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 1, max: 500 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        categories,
        createdAt: new Date(),
        updatedAt: faker.date.recent(),
        ...opts,
    };
}
