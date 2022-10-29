import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

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
}
