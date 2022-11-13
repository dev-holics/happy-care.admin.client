import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  public originData: OriginModel;
  public origins: OriginModel[];
  public paginator: any ={
    page: 1,
    limit: 10,
    totalData: 0
  }

  constructor(
    public originsService: OriginsService,
    private messageService: MessageService
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

  showDialog() {
    this.displayDialog = true;
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateOrigin(data) : this.addOrigin(data);
    }
  }
}
