import type { Product } from "../product.js";
import { faker } from "@faker-js/faker";

export function productMock(opts?: Partial<Product>): Product {
  return {
    id: crypto.randomUUID(),
    name: faker.commerce.product(),
    price: faker.number.int({ max: 10000, min: 5000 }),
    ...opts,
  };
}
