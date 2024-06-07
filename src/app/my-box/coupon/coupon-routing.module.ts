import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CouponComponent } from './coupon.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CouponComponent }]),
    ],
    exports: [RouterModule],
})
export class CouponRoutingModule {}
