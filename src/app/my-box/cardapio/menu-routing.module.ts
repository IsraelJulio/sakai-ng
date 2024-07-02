import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { MenuComponent } from './menu/menu.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MenuComponent,
                children: [
                    {
                        path: '',
                        component: ItemsComponent,
                    },
                ],
            },
            { path: 'edit', component: MenuManagementComponent },
        ]),
    ],
})
export class MenuRoutingModule {}
