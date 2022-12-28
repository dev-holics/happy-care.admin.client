import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/pages/products/models/product.model';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public displayDialog: boolean = false;
  public order: OrderModel;
  public products: ProductModel[] = [];

  constructor(
    private productsService: ProductsService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  async getProducts(): Promise<void> {
    const res = await this.productsService.getProducts(null);
    this.products = res.data;
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
    console.log(order);
    this.displayDialog = false;
    if (order) {
    }
  }

}
