import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MyOrder } from 'src/app/domain/my-order';
import { OrderService } from '../../service/order.service';
import { MyOrdersEditComponent } from '../my-orders-edit/my-orders-edit.component';
import { Footer } from '../my-orders-edit/footer';

@Component({
    selector: 'app-card-order',
    templateUrl: './card-order.component.html',
    styleUrl: './card-order.component.scss',
})
export class CardOrderComponent {
    @Input() order: MyOrder;
    analyseOrder: boolean = false;
    oderlist: MyOrder[];
    currentOrder: MyOrder;
    ref: DynamicDialogRef | undefined;
    constructor(
        private orderService: OrderService,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {}
    show(order: MyOrder) {
        this.currentOrder = order;
        this.ref = this.dialogService.open(MyOrdersEditComponent, {
            header: 'Detalhes do Pedido',
            width: '50vw',
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
            templates: {
                footer: Footer,
            },
            data: order,
        });

        this.ref.onClose.subscribe((data: any) => {
            if (data?.summary == 'next') {
                this.orderService.updateOrderStatus(order.id).subscribe((x) => {
                    this.orderService.reset(x);
                    this.messageService.add({
                        severity: 'success',
                        summary: '',
                        detail: 'Pedido Atualizado',
                        life: 3000,
                    });
                });
            }
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({
                severity: 'info',
                summary: 'Maximized',
                detail: `maximized: ${value.maximized}`,
            });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}
