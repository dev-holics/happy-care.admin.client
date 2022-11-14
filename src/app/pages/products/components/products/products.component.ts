import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService, MessageService, ConfirmationService],
})
export class ProductsComponent implements OnInit {
  public products: ProductModel[];
  public selectedProduct: ProductModel;
  public displayDialog: boolean = false;
  public paginator: any = {
    page: 1,
    limit: 10,
    totalData: 0,
  };
  public searchText: string = '';

  constructor(
    public productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    let query: any = {
      page: this.paginator.page,
      limit: this.paginator.limit,
      search: this.searchText
    };
    const res = await this.productsService.getProducts(query);
    this.products = res.data;
    this.paginator = res.paginator;
    console.log(this.products);
  }

  async addProduct(product: ProductModel) {
    await this.productsService.addProduct(product);
    this.messageService.add({
      severity: 'info',
      summary: 'Inserted',
      detail: 'Record inserted',
    });
    this.getProducts();
  }

  async updateProduct(product: ProductModel) {
    await this.productsService.updateProduct(product);
    this.messageService.add({
      severity: 'info',
      summary: 'Updated',
      detail: 'Record updated',
    });
    this.getProducts();
  }

  async deleteProduct(product: ProductModel) {
    await this.productsService.deleteProduct(product.id);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'Record deleted',
    });
    this.getProducts();
  }

  paginate(event): void {
    this.paginator.limit = event.rows;
    this.paginator.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.getProducts();
  }

  openDialog(product): void {
    this.displayDialog = true;
    if (product) {
      this.selectedProduct = product;
    } else {
      this.selectedProduct = new ProductModel();
    }
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateProduct(data) : this.addProduct(data);
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
