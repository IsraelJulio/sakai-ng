import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { MenuComponent } from '../cardapio/menu/menu.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: OrderComponent },
            { path: 'menu', component: MenuComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
