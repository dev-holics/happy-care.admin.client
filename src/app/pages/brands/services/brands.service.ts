import { Injectable } from '@angular/core';
import { BrandModel } from '../models/brand.model';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/shared/config/url.config';

@Injectable({ providedIn: 'root'})
export class BrandsService {
  constructor(
    public httpService: HttpService
  ) {}

  async getBrands(queryObject: any, isBlocked = true): Promise<any> {
    const query = this.httpService.convertQueryString(queryObject);
		const url = `${URL_CONFIG.BRAND_PUBLIC_URL}${query}`;
		const res = await this.httpService.get(url, isBlocked);

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

  async addBrand(brand: BrandModel) {
    const url = `${URL_CONFIG.BRAND_ADMIN_URL}`;
    await this.httpService.post(url, brand);
  }

  async updateBrand(brand: BrandModel) {
    const url = `${URL_CONFIG.BRAND_ADMIN_URL}/${brand.id}`;
    await this.httpService.put(url, brand);
  }

  async deleteBrand(id: number) {
    const url = `${URL_CONFIG.BRAND_ADMIN_URL}/${id}`;
    await this.httpService.delete(url);
  }
}
