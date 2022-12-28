import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders/services/orders.service';
import moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public selectedDate: Date = moment().toDate();
  public selectedYear: number = 2022;

  public years: number[] = [2021, 2022, 2023, 2024];

  public monthData: {
    datasets: any[],
    labels: string[]
  } = {datasets: [{data: [0, 0], label: []}], labels: []};

  public dayData: {
    datasets: any[],
    labels: string[]
  } = {datasets: [{data: [], label: []}], labels: ['Tiền mặt', 'Chuyển khoản']}

  public monthOptions = {
    plugins: {
        title: {
            display: true,
            text: 'Doanh thu tháng theo năm',
            fontSize: 16
        },
        legend: {
            position: 'bottom'
        }
    }
  };

  public dayOptions = {
    plugins: {
        title: {
            display: true,
            text: 'Doanh thu ngày theo phương thức thanh toán',
            fontSize: 16
        },
        legend: {
            position: 'bottom'
        }
    }
  };

  constructor(private ordersService: OrdersService) {
  }

  async ngOnInit(): Promise<void> {
    const tempMonth: string[] = [];
    for (let i = 1; i <= 12; ++i) {
      tempMonth.push(`Tháng ${i}`);
    }
    this.monthData.labels = tempMonth;
    await this.getMonthRevenue();
    await this.getDayRevenue();
  }

  async getMonthRevenue() {
    const res = await this.ordersService.getRevenueByYear(this.selectedYear);

    if (!res.success) {
      return;
    }

    const tempData: number[] = [];


    res.data.forEach(revenue => {
      tempData.push(revenue.totalPrice);
    });
    this.monthData.datasets[0].data = tempData;
  }

  async getDayRevenue() {
    const params = {
      date: moment(this.selectedDate).format('YYYY-MM-DD')
    }
    const res = await this.ordersService.getRevenueByDate(params);

    if (!res.success) {
      return;
    }

    const tempData = [res.data.totalCash, res.data.totalTransfer]

    this.dayData.datasets[0].data = tempData;
  }
}

