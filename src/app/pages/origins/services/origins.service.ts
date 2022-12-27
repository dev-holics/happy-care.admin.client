import { Injectable } from '@angular/core';
import { OriginModel } from '../models/origin.model';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from 'src/app/shared/config/url.config';

@Injectable()
export class OriginsService {
  constructor(public httpService: HttpService) {}

  async getOrigins(queryObject: any): Promise<any> {
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

  async addOrigin(origin: OriginModel) {
    const url = `${URL_CONFIG.ORIGIN_ADMIN_URL}`;
    await this.httpService.post(url, origin);
  }

  async updateOrigin(origin: OriginModel) {
    const url = `${URL_CONFIG.ORIGIN_ADMIN_URL}/${origin.id}`;
    await this.httpService.put(url, origin);
  }

  async deleteOrigin(id: number) {
    const url = `${URL_CONFIG.ORIGIN_ADMIN_URL}/${id}`;
    return this.httpService.delete(url);
  }
}
