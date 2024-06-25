import { OrderRoutingModule } from './order-routing.module';
import { DialogService } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OrderComponent } from './order.component';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { BadgeModule } from 'primeng/badge';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { MenuComponent } from '../cardapio/menu/menu.component';

@NgModule({
    declarations: [OrderComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        TableModule,
        FileUploadModule,
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
        CardModule,
        MultiSelectModule,
        BadgeModule,
        InputGroupModule,
        InputGroupAddonModule,
        CheckboxModule,
        AutoCompleteModule,
        ChipsModule,
    ],
    providers: [MessageService, DialogService, ConfirmationService],
})
export class OrderModule {}
