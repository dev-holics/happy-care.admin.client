import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';
import { UserToken, UserLogin } from '../_models/user';
import { map } from 'rxjs/operators';
import { Profile } from '../_models/profile';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'}),
  };
  private currentUser = new BehaviorSubject<UserToken | null>(null);
  currentUser$ = this.currentUser.asObservable();
  constructor(private httpClient: HttpClient) { }
  login(userLogin: UserLogin): Observable<any>{
    return this.httpClient.post<any>(`${environment.baseUrl}/login`,userLogin,this.httpOptions)
    .pipe(
      map((response: any) => {
        const data = response.data;
        if (data)
        {
          localStorage.setItem('currentUser', JSON.stringify(data))
          this.currentUser.next(data);
          return data;
        }
      })
    );
  }
  public get currentUserValue() {
    return this.currentUser.value;
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
  refreshToken() {
    const localObj= localStorage.getItem('currentUser');
    if(localObj)
    {
      let user= JSON.parse(localObj);
      if (user) {
        this.currentUser.next(user);
        return;
      }
    }
    this.logout();
  }

  getProfile() : Observable<Profile>{
    return this.httpClient.get<Profile>(`${environment.baseUrl}/profile`);
  }

  updateProfile(profile: Profile): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/profile`, profile, this.httpOptions)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
