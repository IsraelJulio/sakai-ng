import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { MenuRoutingModule } from './menu-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [MenuManagementComponent],
    imports: [
        CommonModule,
        MenuRoutingModule,
        TableModule,
        PickListModule,
        OrderListModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        InputSwitchModule,
        TagModule,
    ],
    providers: [MessageService, DialogService, ConfirmationService],
})
export class MenuModule {}
