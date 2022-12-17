import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public displayDialog: boolean = false;
  public order: OrderModel;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog(order): void {
    this.displayDialog = true;
    if (order) {
      this.order = order;
    } else {
      this.order = new OrderModel();
    }
  }

  onHideDialog(order): void {
    console.log('OrdersComponent || onHideDialog', order);
    this.displayDialog = false;
    if (order) {
    }
  }

}
