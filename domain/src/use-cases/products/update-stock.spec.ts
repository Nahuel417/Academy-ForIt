import { describe, test, expect, beforeEach } from 'vitest';
import { updateStock } from './update-stock.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('updateStock use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([{ id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [], createdAt: new Date() }]);
    });

    test('should increment stock', async () => {
        const result = await updateStock({ productService }, { id: '1', delta: 3 });
        expect(result).toBeUndefined();
        expect(productService.products[0]?.stock).toBe(8);
    });

    test('should decrement stock', async () => {
        await updateStock({ productService }, { id: '1', delta: -2 });
        expect(productService.products[0]?.stock).toBe(3);
    });

    test('should return error if product not found', async () => {
        const result = await updateStock({ productService }, { id: '999', delta: 1 });
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Product not found');
    });
});
