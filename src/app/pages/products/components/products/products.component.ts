import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AccountsService } from 'src/app/_services/accounts.service';
import decode from "jwt-decode";
import { ProductsService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { PERMISSION } from 'src/app/shared/config';
import { OriginModel } from 'src/app/pages/origins/models/origin.model';
import { BrandModel } from 'src/app/pages/brands/models/brand.model';
import { CategoryModel } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/pages/categories/services/categories.service';
import { OriginsService } from 'src/app/pages/origins/services/origins.service';
import { BrandsService } from 'src/app/pages/brands/services/brands.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService, MessageService, ConfirmationService],
})
export class ProductsComponent implements OnInit {
  public categories: CategoryModel[];
  public origins: OriginModel[];
  public products: ProductModel[];
  public trademark: BrandModel[];
  public selectedProduct: ProductModel;
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
    private categoriesService: CategoriesService,
    private originsService: OriginsService,
    private productsService: ProductsService,
    private brandsService: BrandsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
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

  // async getCategories(): Promise<void> {
  //   const res = await this.categoriesService.getCategories();
  //   this.categories = res.data;
  // }

  async getOrigins(): Promise<void> {
    const res = await this.originsService.getOrigins(null);
    this.origins = res.data;
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

    console.log(this.products);
  }

  async getBrands(): Promise<BrandModel> {
    const res = await this.brandsService.getBrands(null);
    return res.data;
  }

  public addProduct(product: ProductModel) {
  }

  public updateProduct(product: ProductModel) {
  }

  public deleteProduct(product: ProductModel) {
  }

  paginate(event): void {
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