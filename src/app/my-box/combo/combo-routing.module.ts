import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComboComponent } from './combo.component';

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([{ path: '', component: ComboComponent }])],
})
export class ComboRoutingModule {}
