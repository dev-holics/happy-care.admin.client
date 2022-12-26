import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { OriginModel } from '../../models/origin.model';
import { OriginsService } from '../../services/origins.service';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.scss'],
  providers: [OriginsService]
})
export class OriginsComponent implements OnInit {
  public displayDialog: boolean;
  public selectedOrigin: OriginModel;
  public origins: OriginModel[];
  public paginator: any ={
    page: 1,
    limit: 10,
    totalData: 0
  }
  public searchText: string = '';

  constructor(
    public originsService: OriginsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getOrigins();
  }

  async getOrigins() {
    let query: any = {
      page: this.paginator.page,
      limit: this.paginator.limit
    };
    const res = await this.originsService.getOrigins(query);
    this.origins = res.data;
    this.paginator = res.paginator;
  }

  async addOrigin(origin: OriginModel) {
    await this.originsService.addOrigin(origin);
    this.messageService.add({
      severity: 'info',
      summary: 'Inserted',
      detail: 'Record inserted',
    });
    this.getOrigins();
  }

  async updateOrigin(origin: OriginModel) {
    await this.originsService.updateOrigin(origin);
    this.messageService.add({
      severity: 'info',
      summary: 'Updated',
      detail: 'Record updated',
    });
    this.getOrigins();
  }

  paginate(event): void {
    this.paginator.limit = event.rows;
    this.paginator.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.getOrigins();
  }

  openDialog(origin): void {
    this.displayDialog = true;
    if (origin) {
      this.selectedOrigin = origin;
    } else {
      this.selectedOrigin = new OriginModel();
    }
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateOrigin(data) : this.addOrigin(data);
    }
  }

  openConfirmDialog(trademark): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
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
