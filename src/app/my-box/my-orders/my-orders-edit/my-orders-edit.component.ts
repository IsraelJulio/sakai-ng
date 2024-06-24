import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MyOrder } from 'src/app/domain/my-order';

@Component({
    selector: 'app-my-orders-edit',
    templateUrl: './my-orders-edit.component.html',
    styleUrl: './my-orders-edit.component.scss',
})
export class MyOrdersEditComponent {
    order: MyOrder;
    orderForm: FormGroup | undefined;
    total: number = 0;
    coupon: boolean = false;
    constructor(
        private config: DynamicDialogConfig,
        private fb: UntypedFormBuilder
    ) {
        this.order = config.data;
        this.coupon = this.order.coupon ? true : false;
        console.log(this.coupon);
        this.buildForm();
        this.total = this.order.totalPrice;
    }
    buildForm() {
        this.orderForm = this.fb.group({
            name: [this.order.name, Validators.required],
            id: [this.order.id],
            totalPrice: [this.order.totalPrice],
            coupon: [this.order.coupon],
            products: [this.order.products],
            phoneNumber: [this.order.phoneNumber, Validators.required],
            paymentMethod: [this.order.paymentMethod, Validators.required],
            isDelivery: [this.order.isDelivery, Validators.required],
            houseNumber: [this.order.houseNumber, Validators.required],
            reference: [this.order.reference],
            city: [this.order.city, Validators.required],
            neighborhood: [this.order.neighborhood, Validators.required],
            complement: [this.order.complement],
            street: [this.order.street, Validators.required],
            clientId: [null],
        });
        this.orderForm.disable();
    }
    onSubmit() {}
}
