import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchModel } from 'src/app/pages/branches/models/branch.model';
import { BranchesService } from 'src/app/pages/branches/services/branches.service';
import { ProductExportModel, ProductImportModel, ProductLogModel, ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.component.html',
  styleUrls: ['./product-log.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProductLogComponent implements OnInit {
  public branches: BranchModel[] = [];
  public products: ProductModel[] = [];
  public productLog: ProductLogModel[] = [];
  public displayImportDialog: boolean = false;
  public productImport: ProductImportModel;
  public displayExportDialog: boolean = false;
  public productExport: ProductExportModel;

  public searchData: any = {
    branchId: null,
    transactionDate: null,
    type: null
  }

  public paginator: any ={
    page: 1,
    limit: 10,
    totalData: 0
  }

  constructor(
    private branchesService: BranchesService,
    private productsService: ProductsService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    await this.getProductLog();
  }

  async getProductLog(): Promise<void> {
    let query: any = {
			page: this.paginator.page,
			limit: this.paginator.limit,
      branchId: this.searchData.branchId,
      transactionDate: this.searchData.transactionDate,
      type: this.searchData.type
		};
    const res = await this.productsService.getProductLog(query);
    this.productLog = res.data;
    this.paginator = res.paginator;
  }

  async addProductImport(productImport: ProductImportModel): Promise<void> {
    await this.productsService.addProductImport(productImport);
    await this.getProductLog();
  }

  async addProductExport(productExport: ProductExportModel): Promise<void> {
    await this.productsService.addProductExport(productExport);
    await this.getProductLog();
  }

  async getProducts() {
    const res = await this.productsService.getProducts(null);
    this.products = res.data;
  }

  async getBranches() {
    const res = await this.branchesService.getBranches(null);
    this.branches = res.data;
  }

  paginate(event) {
  }

  onChangeBranch(event) {
  }

  openImportDialog(productImport: ProductImportModel | null) {
    this.displayImportDialog = true;
    if (productImport) {
      this.productImport = productImport;
    } else {
      this.productImport = new ProductImportModel();
    }
  }

  openExportDialog(productExport: ProductExportModel | null) {
    this.displayExportDialog = true;
    if (productExport) {
      this.productExport = productExport;
    } else {
      this.productExport = new ProductExportModel();
    }
  }

  async onHideImportDialog(productImport): Promise<void> {
    console.log(productImport);
    this.displayImportDialog = false;
    if (productImport) {
      if (!productImport.id) {
        await this.addProductImport(productImport);
      } else {
      }
    }
  }

  async onHideExportDialog(productExport): Promise<void> {
    console.log(productExport);
    this.displayExportDialog = false;
    if (productExport) {
      if (!productExport.id) {
        // await this.addProductExport(productExport);
      } else {
      }
    }
  }

}
