import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { DialogService } from 'primeng/dynamicdialog';

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
import { CategoryComponent } from './category.component';
@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
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
    ],
    providers: [MessageService, DialogService, ConfirmationService],
})
export class CategoryModule {}
