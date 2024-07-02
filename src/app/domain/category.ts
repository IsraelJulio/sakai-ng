import { Product } from './product';

export interface Category {
    name: string;
    id: string;
    isActive: boolean;
    order?: number;
}
export class CategoryProduct {
    name: string;
    id: string;
    items: Product[];
    isActive: boolean;
    constructor(name, id, isActive, items) {
        this.name = name;
        this.id = id;
        this.isActive = isActive;
        this.items = items;
    }
}
