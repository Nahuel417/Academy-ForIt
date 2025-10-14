import type { Entity } from '../utils/types/entity.js';
import type { Category } from './category.js';

export interface Product extends Entity {
    name: string;
    description?: string;
    categories: Category[];
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt?: Date;
}
