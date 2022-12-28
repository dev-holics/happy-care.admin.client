import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL_CONFIG } from '../shared/config';
import { ImportProductDto, ProductLogDto } from '../_models/product_log';

@Injectable({
  providedIn: 'root'
})
export class ProductLogService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  constructor(private httpClient: HttpClient) { }

  getProductLog(
      page: number,
      limit: number,
      query?: string,
      branchId?: string,
      transactionDate?: Date) : Observable<ProductLogDto[]> {
    let transacetionDateString = '';
    if (transactionDate) transacetionDateString = transactionDate.toString();
    const params : {page: number, limit: number, query?: string, transacetionDateString?: string, branchId?: string}
      = { page, limit, transacetionDateString, branchId};

    if (!transactionDate) delete params.transacetionDateString;
    if (!branchId) delete params.branchId;
    if (!query) delete params.query;
    return this.httpClient.get<ProductLogDto[]>(`${URL_CONFIG.PRODUCT_ADMIN_URL}/logs`, {params: params})
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  create(productLogCreate: ImportProductDto) : Observable<any> {
    return this.httpClient.post(`${URL_CONFIG.PRODUCT_ADMIN_URL}/update-stock`, productLogCreate, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}