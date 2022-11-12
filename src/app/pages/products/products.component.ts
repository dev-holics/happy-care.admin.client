import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Product } from './product.model';
import { ProductsService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService, MessageService, ConfirmationService],
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  public selectedProduct: Product;
  public displayDialog: boolean = false;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;

  constructor(
    public productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getProducts(this.page, this.limit);
  }

  public getProducts(page: number, limit: number): void {
    this.products = []; // for show spinner each time
    this.productsService.getProducts(page, limit).subscribe((obj) => {
      console.log(obj);
      this.page = obj['currentPage'];
      this.limit = obj['limit'];
      this.totalData = obj['totalData'];
      let data = obj['data'];
      console.log(data);
      data.map((product) => {
        product.categoryId = product.category.id;
      });
      this.products = data;
    });
  }

  public addProduct(product: Product) {
    this.productsService
      .addProduct(product)
      .subscribe((trademark) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Inserted',
          detail: 'Record inserted',
        });
        this.getProducts(this.page, this.limit);
      });
  }

  public updateProduct(product: Product) {
    this.productsService
      .updateProduct(product)
      .subscribe((product) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Updated',
          detail: 'Record updated',
        });
        this.getProducts(this.page, this.limit)
      });
  }

  public deleteProduct(product: Product) {
    this.productsService
      .deleteProduct(product.id)
      .subscribe((product) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
        this.getProducts(this.page, this.limit);
      });
  }

  paginate(event): void {
    this.limit = event.rows;
    this.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.getProducts(this.page, this.limit);
  }

  openDialog(product): void {
    this.displayDialog = true;
    if (product) {
      this.selectedProduct = product;
    } else {
      this.selectedProduct = new Product();
    }
  }

  openConfirmDialog(product): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteProduct(product);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
