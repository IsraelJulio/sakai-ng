import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { OrderService } from '../service/order.service';
import { MyOrder } from 'src/app/domain/my-order';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MyOrdersEditComponent } from './my-orders-edit/my-orders-edit.component';
import { Footer } from './my-orders-edit/footer';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-my-orders',
    styleUrls: ['./my-orders.component.scss'],
    templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent implements OnInit {
    analyseOrder: boolean = false;
    orderlist: MyOrder[];
    currentOrder: MyOrder;
    ref: DynamicDialogRef | undefined;

    constructor(
        private orderService: OrderService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {
        this.orderService.getActives().subscribe((x) => {
            console.log(x);
            this.orderlist = x;
        });
    }
    ngOnInit() {
        this.orderService.resetSource$.subscribe((newList: MyOrder[]) => {
            this.orderlist = newList;
        });
    }

    trackByOrderId(index: number, order: MyOrder): number {
        return +order.id;
    }
    getAnalyse(statusid: number): MyOrder[] {
        return this.orderlist.filter((x) => x.status === 0);
    }
    getProduction(statusid: number): MyOrder[] {
        return this.orderlist.filter((x) => x.status === 1);
    }
    getReady(statusid: number): MyOrder[] {
        return this.orderlist.filter((x) => x.status === 2);
    }
}
