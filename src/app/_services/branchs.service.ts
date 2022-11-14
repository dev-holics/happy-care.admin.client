import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.httpClient.get<Branch[]>(`${environment.baseUrl}/public/branches/list`, {
      params: {
        page,
        limit,
      }
    });
  }

  getBranchById(branchId: string) : Observable<Branch> {
    return this.httpClient.get<Branch>(`${environment.baseUrl}/public/branches/${branchId}`);
  }

  getCities() : Observable<City[]> {
    return this.httpClient.get<City[]>(`${environment.baseUrl}/public/cities`);
  }

  getDistrictsByCityId(cityId: string): Observable<District[]> {
    return this.httpClient.get<District[]>(`${environment.baseUrl}/public/cities/${cityId}/district`);
  }

  create(branch: BranchCreateUpdate): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/admin/branches`, branch, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  put(id: string, branch: BranchCreateUpdate): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/admin/branches/${id}`, branch, this.httpOptions);
  }
}
