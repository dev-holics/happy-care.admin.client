import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL_CONFIG } from '../shared/config';
import { PermissionCreate, PermissionUpdate } from '../_models/permissions';
import { Permission } from '../_models/role';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(private httpClient: HttpClient) {}

  getPermission(
    page: number,
    limit: number,
    module?: string,
    isActive?: boolean
  ): Observable<Permission[]> {
    const params: {
      page?: number;
      limit: number;
      sort: string;
      isActive: boolean;
      module?: string;
    } = { page, limit, module, isActive: true, sort: 'createdAt@desc' };

    if (!module || module.length == 0) delete params.module;
    return this.httpClient
      .get<Permission[]>(`${URL_CONFIG.PERMISSION_ADMIN_URL}/list`, {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getPermissionById(permissionId: string): Observable<Permission> {
    return this.httpClient
      .get<Permission>(`${URL_CONFIG.PERMISSION_ADMIN_URL}/${permissionId}`)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  create(permissionCreate: PermissionCreate): Observable<any> {
    return this.httpClient
      .post(
        `${URL_CONFIG.PERMISSION_ADMIN_URL}`,
        permissionCreate,
        this.httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  put(
    permissionId: string,
    permissionUpdate: PermissionUpdate
  ): Observable<any> {
    return this.httpClient
      .put(
        `${URL_CONFIG.PERMISSION_ADMIN_URL}/${permissionId}`,
        permissionUpdate,
        this.httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  inActivePermission(permissionId: string): Observable<any> {
    console.log(permissionId);
    return this.httpClient
      .put(
        `${URL_CONFIG.PERMISSION_ADMIN_URL}/${permissionId}/inactive`,
        this.httpOptions
      )
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }

  activePermission(permissionId: string): Observable<any> {
    return this.httpClient
      .put(
        `${URL_CONFIG.PERMISSION_ADMIN_URL}/${permissionId}/active`,
        this.httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
