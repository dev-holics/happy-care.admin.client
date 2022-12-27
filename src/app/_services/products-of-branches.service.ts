import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_CONFIG } from '../shared/config';
import { ProductOfBranchDto } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsOfBranchesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  constructor(private httpClient: HttpClient) { }

  getProductsOfBranches(page: number, limit: number, search?: string, branchId?: string) : Observable<ProductOfBranchDto[]> {
    const params : {page: number, limit: number, search?: string, branchId?: string}
      = { page, limit, search, branchId};

    if (!search) delete params.search;
    if (!branchId) delete params.branchId;
    return this.httpClient.get<ProductOfBranchDto[]>(`${URL_CONFIG.PRODUCT_DETAIL_PUBLIC_URL}`, {params: params})
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }
}
