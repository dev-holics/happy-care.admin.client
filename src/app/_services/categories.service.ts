import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryCreateUpdate } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.baseUrl}/public/categories`);
  }

  getCategoriesById(categoryId: string) : Observable <Category> {
    return this.httpClient.get<Category>(`${environment.baseUrl}/public/categories/tree`, {params: {parentId: categoryId}})
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  create(category: CategoryCreateUpdate): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/admin/categories`, category, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
