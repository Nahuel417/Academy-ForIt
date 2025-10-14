import { describe, test, expect, beforeEach } from 'vitest';
import { deleteProduct } from './delete-product.js';
import { MockedProductService } from '../../services/mocks/mock-product-service.js';

describe('deleteProduct use-case', () => {
    let productService: MockedProductService;

    beforeEach(() => {
        productService = new MockedProductService([{ id: '1', name: 'Laptop', price: 1000, stock: 5, categories: [], createdAt: new Date() }]);
    });

    test('should delete product', async () => {
        const result = await deleteProduct({ productService }, { id: '1' });

        expect(result).toBeUndefined();
        expect(productService.products).toHaveLength(0);
    });

    test('should return error if product not found', async () => {
        const result = await deleteProduct({ productService }, { id: '999' });

        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe('Product not found');
    });
});
