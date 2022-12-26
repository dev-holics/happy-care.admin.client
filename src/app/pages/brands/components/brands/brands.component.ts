import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { OriginModel } from '../../../origins/models/origin.model';
import { OriginsService } from '../../../origins/services/origins.service';
import { BrandModel } from '../../models/brand.model';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  providers: [OriginsService, BrandsService],
})
export class BrandsComponent implements OnInit {
  public displayDialog: boolean;
  public selectedBrand: BrandModel;
  public origins: OriginModel[];
  public brands: BrandModel[];
  public paginator: any = {
    page: 1,
    limit: 10,
    totalData: 0,
  };
  public searchText: string = '';

  constructor(
    public brandsService: BrandsService,
    public originsService: OriginsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService  
  ) {}

  ngOnInit(): void {
    this.getOrigins();
    this.getBrands();
  }

  async getOrigins() {
    const res = await this.originsService.getOrigins({
      page: 1,
      limit: 1000,
    });
    this.origins = res.data;
  }

  async getBrands() {
    let query: any = {
			page: this.paginator.page,
			limit: this.paginator.limit,
      search: this.searchText
		};
    const res = await this.brandsService.getBrands(query);
    this.brands = res.data.map((brand) => {
      brand.originId = brand.origin.id;
      return brand;
    });
    this.paginator = res.paginator;
    console.log(this.brands);
    console.log(this.paginator.totalData);
  }

  async addBrand(brand: BrandModel) {
    await this.brandsService.addBrand(brand);
    this.messageService.add({
      severity: 'info',
      summary: 'Inserted',
      detail: 'Record inserted',
    });
    this.getBrands();
  }

  async updateBrand(brand: BrandModel) {
    await this.brandsService.updateBrand(brand);
    this.messageService.add({
      severity: 'info',
      summary: 'Updated',
      detail: 'Record updated',
    });
    this.getBrands();
  }

  async deleteBrand(brand: BrandModel) {
    await this.brandsService.deleteBrand(brand.id);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'Record deleted',
    });
    this.getBrands();
  }

  paginate(event): void {
    this.paginator.limit = event.rows;
    this.paginator.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.getBrands();
  }

  openDialog(brand): void {
    this.displayDialog = true;
    if (brand) {
      this.selectedBrand = brand;
    } else {
      this.selectedBrand = new BrandModel();
    }
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateBrand(data) : this.addBrand(data);
    }
  }

  openConfirmDialog(trademark): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteBrand(trademark);
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
