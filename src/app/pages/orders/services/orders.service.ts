import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/_config/url.config';
import { OrderModel } from '../models/order.model';

@Injectable()
export class OrdersService {
  constructor(public httpService: HttpService) {}

  async getOrders(queryObject: any): Promise<any> {
    const query = this.httpService.convertQueryString(queryObject);
    const url = `${URL_CONFIG.ORIGIN_PUBLIC_URL}${query}`;
    const res = await this.httpService.get(url);

    const data = res.data;
    const paginator = {
      page: res.currentPage,
      limit: res.limit,
      totalData: res.totalData
    }

    return {
      data: data,
      paginator: paginator
    }
  }

  async addOrder(order: OrderModel) {
    const url = `${URL_CONFIG.ORIGIN_ADMIN_URL}`;
    await this.httpService.post(url, order);
  }

  async updateOrder(order: OrderModel) {
    const url = `${URL_CONFIG.ORIGIN_ADMIN_URL}/${order.id}`;
    await this.httpService.put(url, order);
  }

  async deleteOrder(id: number) {
    const url = `${URL_CONFIG.ORIGIN_ADMIN_URL}/${id}`;
    return this.httpService.delete(url);
  }
}