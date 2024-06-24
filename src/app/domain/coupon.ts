import { CouponType } from './couponType';

export interface Coupon {
    value: number;
    couponType: CouponType;
    isActive: boolean;
    id: string;
    cod: string;
    name: string;
}
