import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_CONFIG } from '../shared/config';
import { CategoryCreateUpdate } from '../_models/category';
import { HttpService } from 'src/app/_services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient, public httpService: HttpService) {}

  async getCategories(queryObject: any): Promise<any> {
    const query = this.httpService.convertQueryString(queryObject);
    const url = `${URL_CONFIG.CATEGORY_PUBLIC_URL}${query}`;
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

  async getCategoriesById(categoryId: any): Promise<any> {
    const url = `${URL_CONFIG.CATEGORY_PUBLIC_URL}/tree`;
    const params = { parentId: categoryId };
    const res = await this.httpService.getOne(url, params);

    const data = res.data;

    return {
      data: data,
    };
  }

  async create(category: CategoryCreateUpdate) {
    const url = `${URL_CONFIG.CATEGORY_ADMIN_URL}`;
    await this.httpService.post(url, category);
  }

  async update(id: string, category: CategoryCreateUpdate) {
    const url = `${URL_CONFIG.CATEGORY_ADMIN_URL}/${id}`;
    await this.httpService.put(url, category);
  }
}
