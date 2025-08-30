import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MyOrder } from 'src/app/domain/my-order';
import { PaymentMethodPipe } from '../../pipes/payment-method';

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
    deliveryDrop: any[] = [];
    methods: any[] = [];
    constructor(
        private config: DynamicDialogConfig,
        private fb: UntypedFormBuilder
    ) {
        this.methods = [
            { label: 'Pix', value: 0, src: 'assets/my-box/pix.png' },
            {
                label: 'Card',
                value: 1,
                src: 'assets/my-box/cartao.png',
            },
            {
                label: 'Money',
                value: 2,
                src: 'assets/my-box/dinheiro.png',
            },
        ];
        this.deliveryDrop = [
            {
                label: 'Delivery',
                value: true,
                src: 'assets/my-box/delivery.png',
            },
            {
                label: 'Balcão',
                value: false,
                src: 'assets/my-box/balcao.jpg',
            },
        ];
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
