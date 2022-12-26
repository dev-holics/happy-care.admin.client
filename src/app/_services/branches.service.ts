import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL_CONFIG } from '../_config';
import { Branch, BranchCreateUpdate, City, District } from '../_models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  
  constructor(private httpClient: HttpClient) { }

  getBranches(page: number, limit: number, cityId: string = '', districtId: string = '') : Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(`${URL_CONFIG.BRANCH_PUBLIC_URL}/list`, {
      params: {
        page,
        limit,
      }
    });
  }

  getBranchById(branchId: string) : Observable<Branch> {
    return this.httpClient.get<Branch>(`${URL_CONFIG.BRANCH_PUBLIC_URL}/${branchId}`);
  }

  getCities() : Observable<City[]> {
    return this.httpClient.get<City[]>(`${URL_CONFIG.CITY_PUBLIC_URL}`);
  }

  getDistrictsByCityId(cityId: string): Observable<District[]> {
    return this.httpClient.get<District[]>(`${URL_CONFIG.CITY_PUBLIC_URL}/${cityId}/district`);
  }

  create(branch: BranchCreateUpdate): Observable<any> {
    return this.httpClient.post(`${URL_CONFIG.BRANCH_ADMIN_URL}`, branch, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  put(id: string, branch: BranchCreateUpdate): Observable<any> {
    return this.httpClient.put(`${URL_CONFIG.BRANCH_ADMIN_URL}/${id}`, branch, this.httpOptions);
  }
}
