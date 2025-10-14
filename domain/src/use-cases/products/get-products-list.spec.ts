import { describe, test, expect, beforeEach } from 'vitest';
import { getProductsList } from './get-products-list.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('getProductsList use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([
            { id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [], createdAt: new Date() },
            { id: '2', name: 'Mouse', price: 50, stock: 10, categories: [], createdAt: new Date() },
        ]);
    });

    test('should return all products', async () => {
        const result = await getProductsList({ productService });

        expect(result).toHaveLength(2);
        expect(result[0]?.name).toBe('Laptop');
        expect(result[1]?.name).toBe('Mouse');
    });

    test('should return empty array if no products', async () => {
        productService = new MockedProductService([]);
        const result = await getProductsList({ productService });

        expect(result).toEqual([]);
    });
});
