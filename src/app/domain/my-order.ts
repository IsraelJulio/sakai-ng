import { Coupon } from './coupon';
import { Product } from './product';

export class MyOrder {
    name: string;
    id: string;
    totalPrice: number;
    coupon: Coupon;
    products: Product[] = [];
    phoneNumber: number;
    paymentMethod: number;
    isDelivery: boolean;
    houseNumber: string;
    reference: string;
    city: string;
    neighborhood: string;
    complement: string;
    street: string;
    status: number;
    createdDate: string;
}
