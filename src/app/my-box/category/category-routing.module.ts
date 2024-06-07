import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([{ path: '', component: CategoryComponent }]),
    ],
})
export class CategoryRoutingModule {}
