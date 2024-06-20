import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { OrderService } from '../service/order.service';
import { MyOrder } from 'src/app/domain/my-order';

@Component({
    selector: 'app-my-orders',
    styleUrls: ['./my-orders.component.scss'],
    templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent implements OnInit {
    analyseOrder: boolean = false;
    oderlist: MyOrder[];
    constructor(private orderService: OrderService) {
        this.orderService.getActives().subscribe((x) => {
            this.oderlist = x;
            console.log(this.oderlist);
        });
    }
    ngOnInit() {}
}
