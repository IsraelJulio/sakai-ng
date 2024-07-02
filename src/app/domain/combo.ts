import { Category } from './category';
import { MyOrder } from './my-order';
import { Product } from './product';

export interface Combo {
    products: Product[];
    description: string;
    isActive: boolean;
    id: string;
    minValue: number;
    maxValue: number;
    name: string;
    category: Category;
    categoryId: number;
    myOrder: MyOrder;
    myOrderId: number;
}
