import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/shared/config/url.config';
import { OrderModel } from '../models/order.model';
import { PaginationResponseModel } from 'src/app/_models/response.model';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { DatetimeHelper } from 'src/app/_helpers/datetime.helper';
import { firstValueFrom } from 'rxjs';
import { ErrorHandlerHelper } from 'src/app/shared/helpers/error-handler.helper';
import { DomPortal } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(public httpService: HttpService, private errorHandler: ErrorHandlerHelper) {}

  handleError(err: any) {
		if (
			err instanceof HttpErrorResponse &&
			err.status != HttpStatusCode.Unauthorized
		) {
			return err.error;
		}
		this.errorHandler.handleError(err);
	}

  async getOrders(queryObject: any): Promise<any> {
    const query = this.httpService.convertQueryString(queryObject);
    const url = `${URL_CONFIG.ORDER_ADMIN_URL}${query}`;
    const res = await this.httpService.get(url);

    const data = res.data;
    const paginator = {
      page: res.currentPage,
      limit: res.limit,
      totalData: res.totalData,
    };

    return {
      data: data,
      paginator: paginator,
    };
  }

  async addOrder(order: OrderModel) {
    const url = `${URL_CONFIG.ORDER_ADMIN_URL}`;
    await this.httpService.post(url, order);
  }

  async updateOrder(order: OrderModel) {
    const url = `${URL_CONFIG.ORDER_ADMIN_URL}/${order.id}`;
    await this.httpService.put(url, order);
  }

  async deleteOrder(id: number) {
    const url = `${URL_CONFIG.ORDER_ADMIN_URL}/${id}`;
    return this.httpService.delete(url);
  }

  async updateStatusOrder(
    orderId: string,
    status: string,
  ) : Promise<any> {
    const url = `${URL_CONFIG.ORDER_ADMIN_URL}/${orderId}/status`;
		return firstValueFrom(await this.httpService.put(url, { status }))
      .catch(err => {
        return this.handleError(err);
      });
  }

  async getOrderHistory(
		params: any,
	): Promise<PaginationResponseModel<OrderModel[]>> {
		const queryString = this.httpService.convertQueryString(params);
		const url = `${URL_CONFIG.ORDER_ADMIN_URL}${queryString}`;

		const res = await this.httpService.get(url);

		if (res?.statusCode !== HttpStatusCode.Ok) {
			return {
				data: null,
				totalData: 0,
				success: false,
			};
		}
    console.log(res);

		const orders: OrderModel[] = res?.data.map((d: any) => ({
			id: d.id,
			orderCode: d.orderCode,
			paymentType: d.paymentType,
			orderType: d.orderType,
			status: d.status,
			orderDate: DatetimeHelper.formatDateTime(d.createdAt, 'DD/MM/YYYY'),
			totalPrice: d.totalPrice,
			branch: d.branch,
			userSetting: d.userSetting,
      delivery: d.delivery,
      orderPayment: d.orderPayment,
      products: d.products,
		}));

		return {
			data: orders,
			totalData: res?.totalData || 0,
			success: true,
		};
	}
}
