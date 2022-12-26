import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL_CONFIG } from '../_config';
import { Category, CategoryCreateUpdate } from '../_models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${URL_CONFIG.CATEGORY_PUBLIC_URL}`);
  }

  getCategoriesById(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>(
      `${URL_CONFIG.CATEGORY_PUBLIC_URL}/tree`,
      { params: { parentId: categoryId } }
    );
  }

  create(category: CategoryCreateUpdate): Observable<any> {
    return this.httpClient
      .post(`${URL_CONFIG.CATEGORY_ADMIN_URL}`, category, this.httpOptions)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  put(id: string, category: CategoryCreateUpdate): Observable<any> {
    return this.httpClient.put(
      `${URL_CONFIG.CATEGORY_ADMIN_URL}/${id}`,
      category,
      this.httpOptions
    );
  }
}
