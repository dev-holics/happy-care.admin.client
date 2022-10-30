import { Component, OnInit } from '@angular/core';
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
  public page: number;
  public limit: number;
  public totalData: number;

  constructor(
    public originsService: OriginsService,
    public trademarksService: TrademarksService
  ) {}

  ngOnInit(): void {
    this.getOrigins();
    this.getTrademarks();
  }

  public getOrigins(): void {
    this.origins = []; //for show spinner each time
    this.originsService.getOrigins().subscribe((obj) => {
      let data = obj['data'];
      this.origins = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  public getTrademarks(): void {
    this.trademarks = []; // for show spinner each time
    this.trademarksService.getTrademarks().subscribe((obj) => {
      this.page = obj['currentPage'];
      this.limit = obj['limit'];
      this.totalData = obj['totalData'];
      console.log(this.page, this.limit, this.totalData);
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
      .subscribe((trademark) => this.getTrademarks());
  }

  public updateTrademark(trademark: Trademark) {
    this.trademarksService
      .updateTrademark(trademark)
      .subscribe((trademark) => this.getTrademarks());
  }

  paginate(event): void {
    console.log(event.first, event.rows);
    document.getElementById('main-content')!.scrollTop = 0;
  }

  openDialog(trademark): void {
    this.displayDialog = true;
    if (trademark) {
      this.selectedTrademark = trademark;
    }
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateTrademark(data) : this.addTrademark(data);
    }
  }
}
