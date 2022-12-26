import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AccountsService } from 'src/app/_services/accounts.service';
import decode from "jwt-decode";
import { ProductsService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';


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
  public canUpdate: boolean = true;
  public canAdd: boolean = true;
  public canDelete: boolean = true;
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
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    let query: any = {
			page: this.paginator.page,
			limit: this.paginator.limit,
      search: this.searchText
		};
    this.getProducts(query.page, query.limit);
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser) {
      const tokenPayload:any = decode(currentUser.accessToken)
      const permissions = tokenPayload.role.permissions;

      this.canAdd = this.isAccess(permissions, 'create_product');
      this.canUpdate = this.isAccess(permissions, 'update_product');
      this.canDelete = this.isAccess(permissions, 'delete_product');
    }
  }

  isAccess(permissions: any, permission: string) {
    return permissions.some((x) => x.name == permission);
  }
  public getProducts(page: number, limit: number): void {
    // this.products = []; // for show spinner each time
    // this.productsService.getProducts(page, limit).subscribe((obj) => {
    //   this.page = obj['currentPage'];
    //   this.limit = obj['limit'];
    //   this.totalData = obj['totalData'];
    //   let data = obj['data'];
    //   console.log(data);
    //   data.map((product) => {
    //     product.categoryId = product.category.id;
    //   });
    //   this.products = data;
    // });
  }

  public addProduct(product: ProductModel) {
    // this.productsService
    //   .addProduct(product)
    //   .subscribe((trademark) => {
    //     this.messageService.add({
    //       severity: 'info',
    //       summary: 'Inserted',
    //       detail: 'Record inserted',
    //     });
    //     this.getProducts(this.page, this.limit);
    //   });
  }

  public updateProduct(product: ProductModel) {
    // this.productsService
    //   .updateProduct(product)
    //   .subscribe((product) => {
    //     this.messageService.add({
    //       severity: 'info',
    //       summary: 'Updated',
    //       detail: 'Record updated',
    //     });
    //     this.getProducts(this.page, this.limit)
    //   });
  }

  public deleteProduct(product: ProductModel) {
    // this.productsService
    //   .deleteProduct(product.id)
    //   .subscribe((product) => {
    //     this.messageService.add({
    //       severity: 'info',
    //       summary: 'Confirmed',
    //       detail: 'Record deleted',
    //     });
    //     this.getProducts(this.page, this.limit);
    //   });
  }

  paginate(event): void {
    // this.limit = event.rows;
    // this.page = event.first / event.rows + 1;
    // document.getElementById('main-content')!.scrollTop = 0;
    // this.getProducts(this.page, this.limit);
  }

  openDialog(product): void {
    this.displayDialog = true;
    if (product) {
      this.selectedProduct = product;
    } else {
      this.selectedProduct = new ProductModel();
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