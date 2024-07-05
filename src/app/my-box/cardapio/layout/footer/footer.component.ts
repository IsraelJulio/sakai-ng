import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { OrderService } from 'src/app/my-box/service/order.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
    hasProduct: boolean = false;
    totalItems: number = 0;
    constructor(
        public layoutService: LayoutService,
        private orderService: OrderService
    ) {}
    async ngOnInit() {
        this.orderService.orderList.subscribe((x) => {
            this.totalItems = this.orderService.orderList.value.products.length;
            if (this.orderService.orderList.value.products.length !== 0) {
                console.log(
                    this.orderService.orderList.value.products.length,
                    'caiu true'
                );
                this.hasProduct = true;
            } else {
                this.hasProduct = false;
                console.log(
                    this.orderService.orderList.value.products.length,
                    'caiu false'
                );
            }
        });
    }
}
