import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Branch } from 'src/app/_models/branch';
import { ImportProductDto, ProductLogDto } from 'src/app/_models/product_log';
import { AccountsService } from 'src/app/_services/accounts.service';
import { ProductLogService } from 'src/app/_services/product-log.service';
import decode from 'jwt-decode';
import { ProductsService } from '../products/services/product.service';
import { ProductModel } from '../products/models/product.model';
import { BranchsService } from 'src/app/_services/branches.service';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.component.html',
  styleUrls: ['./product-log.component.scss'],
  providers: [ProductsService],
})
export class ProductLogComponent implements OnInit {

  productLogs: ProductLogDto[] = []
  public branchOptions: Branch[] = []
  public productOptions: ProductModel[] = []
  public displayDialog: boolean;
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;
  public branchId: string = '';
  public query: string = '';
  public transactionDate?: Date;
  public canAdd: boolean = true;

  constructor(
    public branchesService: BranchsService,
    public productsService: ProductsService,
    public productLogService: ProductLogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountsService: AccountsService) { }

    ngOnInit(): void {
      this.fetchProductLogs();
      this.fetchOptions();
      const currentUser = this.accountsService.currentUserValue;
      if (currentUser) {
        const tokenPayload:any = decode(currentUser.accessToken)
        const filteredPermission = tokenPayload.role.permissions
          .some((permission) => permission.name == 'create_product_log')
        if (!filteredPermission) {
          this.canAdd = false;
        }
      }
    }

    fetchProductLogs() {
      this.productLogs = [];
      if (!this.branchId) return;
      this.productLogService.getProductLog(
        this.page,
        this.limit,
        this.query,
        this.branchId,
        this.transactionDate
        ).subscribe(
        (response: any) => {
          this.page = response.currentPage;
          this.limit = response.limit;
          this.totalData = response.totalData;
          this.productLogs = response.data;
        }
      )
    }

    async fetchOptions() {
      this.branchesService.getBranches(0, 200).subscribe(
        (response: any) => {
          this.branchOptions = response.data
        }
      )
      let productQuery: any = {
        page: 0,
        limit: 200,
      }
      let res = await this.productsService.getProducts(productQuery);
      this.productOptions = res.data;
    }


    paginate(event): void {
      this.limit = event.rows;
      this.page = event.first / event.rows + 1;
      document.getElementById('main-content')!.scrollTop = 0;
      this.fetchProductLogs();
    }


    openDialog(id: string | null): void {
      this.displayDialog = true;
      if (id) {
        this.selectedId = id;
      } else {
        this.selectedId = '';
      }
    }

    onHideDialog(data: any): void {
      this.displayDialog = false;
      if (data) {
        this.addProductLog(data);
      }
    }

    public addProductLog(productLog: ImportProductDto) {
      this.productLogService
        .create(productLog)
        .subscribe((response) =>
        {
          this.fetchProductLogs()
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        });
    }

    public onChangeBranch(event: any) {
      this.fetchProductLogs();
    }
}
