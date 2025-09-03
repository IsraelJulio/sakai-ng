import { Category } from './category';

export class Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    isActive?: string;
    category?: Category;
    image?: File | Blob;
    rating?: number;
    isAdctive?: boolean;
    imageBase64?: string;
    imageUrl?: string;
    order?: number;
    constructor() {}
}
