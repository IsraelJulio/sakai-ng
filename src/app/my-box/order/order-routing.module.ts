import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: OrderComponent }])],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
