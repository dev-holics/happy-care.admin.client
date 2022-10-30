import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trademark } from './trademark.model';

@Injectable()
export class TrademarksService {
  public publicUrl = `${environment.baseUrl}/public/trademarks`;
  public adminUrl = `${environment.baseUrl}/admin/trademarks`;
  constructor(public http: HttpClient) {}

  getTrademarks(page: number = 1, limit: number = 10): Observable<Trademark[]> {
    return this.http.get<Trademark[]>(this.publicUrl, {
      params: {
        page: page,
        limit: limit
      }
    });
  }

  addTrademark(trademark: Trademark) {
    console.log(trademark);
    return this.http.post(this.adminUrl, {
      name: trademark.name,
      originId: trademark.originId,
    });
  }

  updateTrademark(trademark: Trademark) {
    return this.http.put(`${this.adminUrl}/${trademark.id}`, {
      name: trademark.name,
      originId: trademark.originId,
    });
  }

  deleteTrademark(id: number) {
    return this.http.delete(this.adminUrl + '/' + id);
  }
}
