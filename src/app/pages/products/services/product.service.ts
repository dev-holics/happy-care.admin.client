import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/shared/config/url.config';
import { ProductModel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(public httpService: HttpService) {}

  async getProducts(queryObject: any): Promise<any> {
    const query = this.httpService.convertQueryString(queryObject);
    const url = `${URL_CONFIG.PRODUCT_PUBLIC_URL}/list${query}`;
    const res = await this.httpService.get(url);

    const data = res.data;
    const paginator = {
      page: res.currentPage,
      limit: res.limit,
      totalData: res.totalData
    };

    return {
      data: data,
      paginator: paginator
    };
  }

  async addProduct(product: ProductModel) {
    const url = `${URL_CONFIG.PRODUCT_ADMIN_URL}`;
    await this.httpService.post(url, product);
  }

  async updateProduct(product: ProductModel) {
    const url = `${URL_CONFIG.PRODUCT_ADMIN_URL}/${product.id}`;
    await this.httpService.put(url, product);
  }

  async deleteProduct(id: string) {
    const url = `${URL_CONFIG.PRODUCT_ADMIN_URL}/${id}`;
    return this.httpService.delete(url);
  }

}
