import { describe, test, expect } from 'vitest';
import { OrderStatus, PaymentMethod, type Order } from '@domain/entities/order.js';
import type { Product } from '@domain/entities/product.js';
import { calculateOrderTotal } from './calculate-order-total.js';

describe('calculateOrderTotal use-case', () => {
    const mockProduct: Product = {
        id: 'p1',
        name: 'Producto 1',
        price: 100,
        stock: 10,
        categories: [],
        createdAt: new Date(),
    };

    test('should calculate total from multiple items', async () => {
        const order: Order = {
            id: 'o1',
            customerName: 'Juan',
            items: [
                { product: mockProduct, quantity: 2, unitPrice: 100 },
                { product: mockProduct, quantity: 1, unitPrice: 200 },
            ],
            status: OrderStatus.COMPLETED,
            paymentMethod: PaymentMethod.CARD,
            total: 0,
            createdAt: new Date(),
        };

        const total = await calculateOrderTotal({}, order);
        expect(total).toBe(400);
    });

    test('should return 0 if order has no items', async () => {
        const order: Order = {
            id: 'o2',
            customerName: 'Ana',
            items: [],
            status: OrderStatus.PENDING,
            paymentMethod: PaymentMethod.CARD,
            total: 0,
            createdAt: new Date(),
        };

        const total = await calculateOrderTotal({}, order);
        expect(total).toBe(0);
    });

    test('should handle decimal prices correctly', async () => {
        const order: Order = {
            id: 'o3',
            customerName: 'Carlos',
            items: [{ product: mockProduct, quantity: 3, unitPrice: 99.99 }],
            status: OrderStatus.COMPLETED,
            paymentMethod: PaymentMethod.TRANSFER,
            total: 0,
            createdAt: new Date(),
        };

        const total = await calculateOrderTotal({}, order);
        expect(total).toBeCloseTo(299.97, 2);
    });

    test('should correctly handle mixed prices and quantities', async () => {
        const order: Order = {
            id: 'o4',
            customerName: 'Lucía',
            items: [
                { product: mockProduct, quantity: 1, unitPrice: 49.5 },
                { product: mockProduct, quantity: 4, unitPrice: 25.25 },
            ],
            status: OrderStatus.COMPLETED,
            paymentMethod: PaymentMethod.CASH,
            total: 0,
            createdAt: new Date(),
        };

        const total = await calculateOrderTotal({}, order);
        expect(total).toBeCloseTo(49.5 + 4 * 25.25, 2);
    });
});
