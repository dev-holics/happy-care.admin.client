import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input('order') order: OrderModel;
  @Input('display') display: boolean;
  @Output() closeDialogEvent = new EventEmitter<any>();

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close();
  }
  constructor(
  ) {
  }

  ngOnInit(): void {
    console.log(this.order);
  }
  close() {
    this.closeDialogEvent.emit(null);
    return;
  }
}
