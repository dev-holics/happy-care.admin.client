import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Branch } from 'src/app/_models/branch';
import { ProductOfBranchDto } from 'src/app/_models/product';
import { ImportProductDto } from 'src/app/_models/product_log';
import { BranchsService } from 'src/app/_services/branchs.service';
import { ProductLogService } from 'src/app/_services/product-log.service';
import { ProductsOfBranchesService } from 'src/app/_services/products-of-branches.service';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/product.service';

@Component({
  selector: 'app-products-of-branches',
  templateUrl: './products-of-branches.component.html',
  styleUrls: ['./products-of-branches.component.scss']
})
export class ProductsOfBranchesComponent implements OnInit {

  products: ProductOfBranchDto[] = []
  public productOptions: Product[] = []
  public branchOptions: Branch[] = []
  public displayDialog: boolean;
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;
  public branchId: string = '';
  public query?: string = '';

  constructor(
    public branchesService: BranchsService,
    public productOfBranchService: ProductsOfBranchesService,
    public productLogService: ProductLogService,
    public productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.fetchProductsOfBranches();
      this.fetchOptions();
    }

    fetchProductsOfBranches() {
      this.products = [];
      if (!this.branchId) return;
      this.productOfBranchService.getProductsOfBranches(
        this.page,
        this.limit,
        this.query,
        this.branchId).subscribe(
        (response: any) => {
          this.page = response.currentPage;
          this.limit = response.limit;
          this.totalData = response.totalData;
          this.products = response.data;
        }
      )
    }

    fetchOptions() {
      this.branchesService.getBranches(0, 200).subscribe(
        (response: any) => {
          this.branchOptions = response.data
        }
      )
      this.productsService.getProducts(0, 500).subscribe(
        (response: any) => {
          this.productOptions = response.data
        }
      )
    }


    paginate(event): void {
      this.limit = event.rows;
      this.page = event.first / event.rows + 1;
      document.getElementById('main-content')!.scrollTop = 0;
      this.fetchProductsOfBranches();
    }


    openDialog(productId: string | null): void {
      this.displayDialog = true;
      if (productId) {
        this.selectedId = productId;
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
          this.fetchProductsOfBranches()
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        });
    }

    public onChangeBranch(event: any) {
      this.branchId = event.value;
      this.fetchProductsOfBranches();
    }
}
