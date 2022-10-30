import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Origin } from './origin.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class OriginsService {
  public publicUrl = `${environment.baseUrl}/public/origins`;
  public adminUrl = `${environment.baseUrl}/admin/origins`;
  constructor(public http: HttpClient) {}

  getOrigins(): Observable<Origin[]> {
    return this.http.get<Origin[]>(this.publicUrl);
  }

  addOrigin(origin: Origin) {
    console.log(origin);
    return this.http.post(this.adminUrl, { name: origin.name });
  }

  updateOrigin(origin: Origin) {
    return this.http.put(this.adminUrl, origin);
  }

  deleteOrigin(id: number) {
    return this.http.delete(this.adminUrl + '/' + id);
  }
}
