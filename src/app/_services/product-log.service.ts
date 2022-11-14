import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImportProductDto, ProductLogDto } from '../_models/product_log';

@Injectable({
  providedIn: 'root'
})
export class ProductLogService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  constructor(private httpClient: HttpClient) { }

  getProductLog(page: number, limit: number, transactionDate?: Date, branchId?: string) : Observable<ProductLogDto[]> {
    let transacetionDateString = '';
    if (transactionDate) transacetionDateString = transactionDate.toString();
    const params : {page: number, limit: number, transacetionDateString?: string, branchId?: string}
      = { page, limit, transacetionDateString, branchId};

    if (!transactionDate) delete params.transacetionDateString;
    if (!branchId) delete params.branchId;
    return this.httpClient.get<ProductLogDto[]>(`${environment.baseUrl}/admin/products/logs`, {params: params})
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  create(productLogCreate: ImportProductDto) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/admin/products/update-stock`, productLogCreate, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
