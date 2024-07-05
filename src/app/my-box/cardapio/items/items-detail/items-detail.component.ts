import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/domain/product';

@Component({
    selector: 'app-items-detail',
    templateUrl: './items-detail.component.html',
    styleUrl: './items-detail.component.scss',
})
export class ItemsDetailComponent implements OnInit {
    product: Product;
    inputValue: number = 0;
    constructor(
        private config: DynamicDialogConfig,
        private fb: UntypedFormBuilder,
        public ref: DynamicDialogRef
    ) {
        this.product = this.config.data.product;
        this.inputValue = this.config.data.quantity;
    }
    async ngOnInit() {}
    closeDialog(data) {
        this.ref.close(data);
    }
    avanceDialog(data) {
        console.log(this.inputValue);
        this.ref.close(this.inputValue);
    }
}
