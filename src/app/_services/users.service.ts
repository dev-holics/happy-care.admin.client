import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserCreate, UserDto } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  constructor(private httpClient: HttpClient) { }

  getUsers(page: number, limit: number, isActive?: boolean) : Observable<UserDto[]> {
    const params : {page?: number, limit: number, sort?:string, isActive: boolean, module?: string}
      = { page, limit, isActive: true, };

    return this.httpClient.get<UserDto[]>(`${environment.baseUrl}/admin/users/`, {params: params})
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  getUserById(userId: string) : Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${environment.baseUrl}/admin/users/${userId}`)
      .pipe(
        map((response:any) => {
          return response.data;
        })
      )
  }

  create(userCreate: UserCreate) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/admin/users/create`, userCreate, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUser(userId: string, userUpdate:UserCreate ) : Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/admin/users/${userId}`, userUpdate, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateRole(userId: string, roleId: string, branchId: string) : Observable<any> {
    const params = {roleId: roleId, branchId: branchId};
    return this.httpClient.put(`${environment.baseUrl}/admin/users/${userId}/update-role`, params, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
