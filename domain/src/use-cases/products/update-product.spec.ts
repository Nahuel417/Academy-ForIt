import { describe, test, expect, beforeEach } from 'vitest';
import { updateProduct } from './update-product.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('updateProduct use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([{ id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [], createdAt: new Date() }]);
    });

    test('should update product properties', async () => {
        const result = await updateProduct({ productService }, { id: '1', price: 1200, stock: 10, updatedAt: new Date() });

        expect(result).toBeUndefined();
        expect(productService.products.length).toBeGreaterThan(0);
        expect(productService.products[0]?.price).toBe(1200);
        expect(productService.products[0]?.stock).toBe(10);
    });

    test('should return error if product not found', async () => {
        const result = await updateProduct({ productService }, { id: '999', price: 100, updatedAt: new Date() });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Product not found');
    });
});
