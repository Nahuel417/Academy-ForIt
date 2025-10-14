import { describe, test, expect, beforeEach } from 'vitest';
import { addProduct } from './add-product.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('addProduct use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([{ id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [], createdAt: new Date() }]);
    });

    test('should add a new product', async () => {
        const result = await addProduct({ productService }, { name: 'Mouse', price: 50, stock: 10, categories: [], createdAt: new Date() });

        expect(result).toBeUndefined();
        expect(productService.products).toHaveLength(2);
        expect(productService.products[1]?.name).toBe('Mouse');
    });

    test('should return error if product exists', async () => {
        const result = await addProduct({ productService }, { name: 'Laptop', price: 1200, stock: 3, categories: [], createdAt: new Date() });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Product already exists');
    });
});
