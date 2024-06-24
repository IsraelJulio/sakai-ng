import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { OrderService } from '../service/order.service';
import { MyOrder } from 'src/app/domain/my-order';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MyOrdersEditComponent } from './my-orders-edit/my-orders-edit.component';
import { Footer } from './my-orders-edit/footer';

@Component({
    selector: 'app-my-orders',
    styleUrls: ['./my-orders.component.scss'],
    templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent implements OnInit {
    analyseOrder: boolean = false;
    oderlist: MyOrder[];
    currentOrder: MyOrder;
    ref: DynamicDialogRef | undefined;
    constructor(
        private orderService: OrderService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {
        this.orderService.getActives().subscribe((x) => {
            console.log(x);
            this.oderlist = x;
        });
    }
    ngOnInit() {}

    trackByOrderId(index: number, order: MyOrder): number {
        if (order.status == 0) return +order.id;
        else return 0;
    }
    getAnalyse(statusid: number): MyOrder[] {
        return this.oderlist.filter((x) => x.status === 0);
    }
    getProduction(statusid: number): MyOrder[] {
        return this.oderlist.filter((x) => x.status === 1);
    }
    getReady(statusid: number): MyOrder[] {
        return this.oderlist.filter((x) => x.status === 2);
    }
}
