import { describe, test, expect, beforeEach } from 'vitest';
import { getProductById } from './get-product-by-id.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('getProductById use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([{ id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [], createdAt: new Date() }]);
    });

    test('should return the product if it exists', async () => {
        const result = await getProductById({ productService }, { id: '1' });

        if (result instanceof Error) throw new Error('Expected a product');
        expect(result.name).toBe('Laptop');
    });

    test('should return error if product not found', async () => {
        const result = await getProductById({ productService }, { id: '999' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Product not found');
    });
});
