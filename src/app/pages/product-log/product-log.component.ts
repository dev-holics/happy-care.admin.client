import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Branch } from 'src/app/_models/branch';
import { ImportProductDto, ProductLogDto } from 'src/app/_models/product_log';
import { BranchsService } from 'src/app/_services/branchs.service';
import { ProductLogService } from 'src/app/_services/product-log.service';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/product.service';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.component.html',
  styleUrls: ['./product-log.component.scss']
})
export class ProductLogComponent implements OnInit {

  productLogs: ProductLogDto[] = []
  public branchOptions: Branch[] = []
  public productOptions: Product[] = []
  public displayDialog: boolean;
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;

  constructor(
    public branchesService: BranchsService,
    public productsService: ProductsService,
    public productLogService: ProductLogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

    ngOnInit(): void {
      this.fetchProductLogs();
      this.fetchOptions();
    }

    fetchProductLogs() {
      this.productLogs = [];
      this.productLogService.getProductLog(this.page, this.limit).subscribe(
        (response: any) => {
          this.page = response.currentPage;
          this.limit = response.limit;
          this.totalData = response.totalData;
          this.productLogs = response.data;
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
}
