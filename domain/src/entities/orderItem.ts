import type { Product } from './product.js';

export interface OrderItem {
    product: Product;
    quantity: number;
    unitPrice: number;
}
