import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            // { path: '', component: MyOrdersComponent },
            {
                path: '',

                loadChildren: () =>
                    import('./my-orders/my-orders.module').then(
                        (m) => m.MyOrdersModule
                    ),
            },
            // { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class MyBoxRoutingModule {}
