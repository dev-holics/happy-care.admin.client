import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  imports: [CommonModule, OrdersRoutingModule, SharedModule.forRoot()],
  declarations: [OrdersComponent, OrderDialogComponent, OrderDetailsComponent],
})
export class OrdersModule {}
