import type { Entity } from '../utils/types/entity.js';

export interface Category extends Entity {
    name: string;
    description?: string;
}
