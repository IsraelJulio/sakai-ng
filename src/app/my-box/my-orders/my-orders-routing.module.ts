import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MyOrdersComponent },
            // {
            //     path: '',

            //     loadChildren: () =>
            //         import('./my-orders/my-orders.module').then(
            //             (m) => m.MyOrdersModule
            //         ),
            // },
            // { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class MyOrdersRoutingModule {}
