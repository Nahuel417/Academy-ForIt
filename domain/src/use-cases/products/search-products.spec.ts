import { describe, test, expect, beforeEach } from 'vitest';
import { searchProducts } from './search-products.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('searchProducts use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([
            { id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [{ id: 'c1', name: 'Electronics' }], createdAt: new Date() },
            { id: '2', name: 'Mouse', price: 50, stock: 10, categories: [{ id: 'c1', name: 'Electronics' }], createdAt: new Date() },
        ]);
    });

    test('should find by name', async () => {
        const result = await searchProducts({ productService }, { name: 'Laptop' });

        expect(result).toHaveLength(1);
        expect(result[0]?.name).toBe('Laptop');
    });

    test('should find by category', async () => {
        const result = await searchProducts({ productService }, { categoryId: 'c1' });

        expect(result).toHaveLength(2);
    });

    test('should return all if no filter provided', async () => {
        const result = await searchProducts({ productService }, {});

        expect(result).toHaveLength(2);
    });
});
