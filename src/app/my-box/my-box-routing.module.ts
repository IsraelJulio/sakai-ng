import { MenuModule } from 'primeng/menu';
import { MenuManagementComponent } from './cardapio/menu-management/menu-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',

                loadChildren: () =>
                    import('./my-orders/my-orders.module').then(
                        (m) => m.MyOrdersModule
                    ),
            },
            {
                path: 'product',

                loadChildren: () =>
                    import('./product/product.module').then(
                        (m) => m.ProductModule
                    ),
            },
            {
                path: 'coupon',

                loadChildren: () =>
                    import('./coupon/coupon.module').then(
                        (m) => m.CouponModule
                    ),
            },
            {
                path: 'category',

                loadChildren: () =>
                    import('./category/category.module').then(
                        (m) => m.CategoryModule
                    ),
            },
            {
                path: 'order',

                loadChildren: () =>
                    import('./order/order.module').then((m) => m.OrderModule),
            },
            {
                path: 'menu-management',

                loadChildren: () =>
                    import('./cardapio/menu.module').then((m) => m.MenuModule),
            },
            {
                path: 'combo',

                loadChildren: () =>
                    import('./combo/combo.module').then((m) => m.ComboModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MyBoxRoutingModule {}
