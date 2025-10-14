import type { Category } from '../category.js';
import { faker } from '@faker-js/faker';

export function categoryMock(opts?: Partial<Category>): Category {
    return {
        id: crypto.randomUUID(),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        createdAt: new Date(),
        ...opts,
    };
}
