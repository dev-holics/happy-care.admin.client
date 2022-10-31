import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Origin } from '../origins/origin.model';
import { OriginsService } from '../origins/origins.service';
import { Trademark } from './trademark.model';
import { TrademarksService } from './trademarks.service';

@Component({
  selector: 'app-trademarks',
  templateUrl: './trademarks.component.html',
  styleUrls: ['./trademarks.component.scss'],
  providers: [OriginsService, TrademarksService],
})
export class TrademarksComponent implements OnInit {
  public displayDialog: boolean;
  public selectedTrademark: Trademark;
  public origins: Origin[];
  public trademarks: Trademark[];
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public originsService: OriginsService,
    public trademarksService: TrademarksService
  ) {}

  ngOnInit(): void {
    this.getOrigins();
    this.getTrademarks(this.page, this.limit);
  }

  public getOrigins(): void {
    this.origins = []; //for show spinner each time
    this.originsService.getOrigins().subscribe((obj) => {
      let data = obj['data'];
      this.origins = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  public getTrademarks(page: number, limit: number): void {
    this.trademarks = []; // for show spinner each time
    this.trademarksService.getTrademarks(page, limit).subscribe((obj) => {
      this.page = obj['currentPage'];
      this.limit = obj['limit'];
      this.totalData = obj['totalData'];
      let data = obj['data'];
      data.map((trademark) => {
        trademark.originId = trademark.origin.id;
      });
      this.trademarks = data;
    });
  }

  public addTrademark(trademark: Trademark) {
    this.trademarksService
      .addTrademark(trademark)
      .subscribe((trademark) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Inserted',
          detail: 'Record inserted',
        });
        this.getTrademarks(this.page, this.limit);
      });
  }

  public updateTrademark(trademark: Trademark) {
    this.trademarksService
      .updateTrademark(trademark)
      .subscribe((trademark) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Updated',
          detail: 'Record updated',
        });
        this.getTrademarks(this.page, this.limit)
      });
  }

  public deleteTrademark(trademark: Trademark) {
    this.trademarksService
      .deleteTrademark(trademark.id)
      .subscribe((trademark) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
        this.getTrademarks(this.page, this.limit);
      });
  }

  paginate(event): void {
    this.limit = event.rows;
    this.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.getTrademarks(this.page, this.limit);
  }

  openDialog(trademark): void {
    this.displayDialog = true;
    if (trademark) {
      this.selectedTrademark = trademark;
    } else {
      this.selectedTrademark = new Trademark();
    }
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateTrademark(data) : this.addTrademark(data);
    }
  }

  openConfirmDialog(trademark): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteTrademark(trademark);
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
