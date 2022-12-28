import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AccountsService } from 'src/app/_services/accounts.service';
import decode from "jwt-decode";
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../models/product.model';
import { PERMISSION } from 'src/app/shared/config';
import { OriginModel } from 'src/app/pages/origins/models/origin.model';
import { BrandModel } from 'src/app/pages/brands/models/brand.model';
import { CategoryModel } from 'src/app/_models/category';
import { OriginsService } from 'src/app/pages/origins/services/origins.service';
import { BrandsService } from 'src/app/pages/brands/services/brands.service';
import { CategoriesService } from 'src/app/pages/categories/services/categories.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProductsComponent implements OnInit {
  public products: ProductModel[];
  public product: ProductModel;
  public displayDialog: boolean = false;

  public canCreate: boolean = true;
  public canUpdate: boolean = true;
  public canDelete: boolean = true;

  public paginator: any = {
    page: 1,
    limit: 10,
    totalData: 0,
  };
  public searchText: string = '';

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accountsService: AccountsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser) {
      const tokenPayload:any = decode(currentUser.accessToken)
      const permissions = tokenPayload.role.permissions;

      this.canCreate = this.isAccess(permissions, PERMISSION.CREATE_PRODUCT);
      this.canUpdate = this.isAccess(permissions, PERMISSION.UPDATE_PRODUCT);
      this.canDelete = this.isAccess(permissions, PERMISSION.DELETE_PRODUCT);
    }
  }

  isAccess(permissions: any, permission: string) {
    return permissions.some((x) => x.name == permission);
  }

  async getProducts(): Promise<void> {
    let query: any = {
			page: this.paginator.page,
			limit: this.paginator.limit,
      search: this.searchText
		};
    const res = await this.productsService.getProducts(query);

    this.products = res.data.map((product) => {
      product.trademarkId = product.trademark.id;
      product.originId = product.origin.id;
      product.categoryId = product.category.id;
      return product;
    });
    this.paginator = res.paginator;
  }

  async addProduct(product: ProductModel) {
    await this.productsService.addProduct(product);
    this.messageService.add({
      severity: 'info',
      summary: 'Inserted',
      detail: 'Record inserted',
    });
    await this.getProducts();
  }

  async updateProduct(product: ProductModel) {
    await this.productsService.updateProduct(product);
    this.messageService.add({
      severity: 'info',
      summary: 'Updated',
      detail: 'Record updated',
    });
    await this.getProducts();
  }

  async deleteProduct(product: ProductModel) {
    await this.productsService.deleteProduct(product.id);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'Record deleted',
    });
    await this.getProducts();
  }

  async paginate(event): Promise<void> {
    this.paginator.limit = event.rows;
    this.paginator.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    await this.getProducts();
  }

  openDialog(product): void {
    this.displayDialog = true;
    if (product) {
      this.product = product;
    } else {
      this.product = new ProductModel();
    }
  }

  async onHideDialog(product): Promise<void> {
    this.displayDialog = false;
    if (product) {
      product.id = this.product.id;
      product.images = [];
      product.price = Number(product.price);
      if (product.id) {
        await this.updateProduct(product);
      } else {
        await this.addProduct(product);
      }
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