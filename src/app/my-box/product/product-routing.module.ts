import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ProductComponent }]),
    ],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
