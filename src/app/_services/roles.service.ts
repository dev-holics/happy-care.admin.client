import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission, Role, RoleUpdate } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  constructor(private httpClient: HttpClient) { }

  getPermission() : Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${environment.baseUrl}/admin/permissions/list`, {params: {isActive: true, limit: 200}})
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
  }
  getRoles() : Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${environment.baseUrl}/admin/roles/list`, {params: {isActive: true}})
    .pipe(
      map((response: any) => {
        return response.data;
      })
    )
  }
  getRolesById(roleId: string) : Observable<Role> {
    return this.httpClient.get<Role>(`${environment.baseUrl}/admin/roles/roleId`, {params: {roleId}})
    .pipe(
      map((response: any) => {
        return response.data;
      })
    )
  }

  put(roleId: string, roleUpdate: RoleUpdate) : Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/admin/roles/${roleId}`, roleUpdate, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
