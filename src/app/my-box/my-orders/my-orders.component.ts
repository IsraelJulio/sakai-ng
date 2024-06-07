import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';

@Component({
    selector: 'app-my-orders',
    styleUrls: ['./my-orders.component.scss'],
    templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent implements OnInit {
    products: Product[] = [];
    constructor() {}
    ngOnInit() {}
}
