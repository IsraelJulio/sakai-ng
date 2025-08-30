import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { MyOrdersComponent } from './my-orders.component';
import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { TimerCountdownComponent } from '../timer-countdown/timer-countdown.component';
import { BadgeModule } from 'primeng/badge';
import { MyOrdersEditComponent } from './my-orders-edit/my-orders-edit.component';
import { CardOrderComponent } from './card-order/card-order.component';
import { PaymentMethodPipe } from '../pipes/payment-method';
import { DropdownItem, DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        DropdownModule,
        CommonModule,
        FormsModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        AccordionModule,
        TabViewModule,
        FieldsetModule,
        MenuModule,
        InputTextModule,
        DividerModule,
        SplitterModule,
        PanelModule,
        MyOrdersRoutingModule,
        ToastModule,
        CardModule,
        ReactiveFormsModule,
        BadgeModule,
    ],
    declarations: [
        MyOrdersComponent,
        TimerCountdownComponent,
        MyOrdersEditComponent,
        PaymentMethodPipe,
        CardOrderComponent,
    ],
    providers: [MessageService, DialogService, ConfirmationService],
})
export class MyOrdersModule {}
