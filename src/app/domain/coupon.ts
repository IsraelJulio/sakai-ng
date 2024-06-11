import { CouponType } from './couponType';

export interface Coupon {
    value: number;
    couponType: typeof CouponType;
    isActive: boolean;
    id: string;
    cod: string;
}
