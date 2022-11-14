import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public publicUrl = `${environment.baseUrl}/public/products/list`;
  public adminUrl = `${environment.baseUrl}/admin/products`;
  constructor(public http: HttpClient) {}

  getProducts(
    page: number,
    limit: number,
    search: string = ''
  ): Observable<Product[]> {
    return this.http.get<Product[]>(this.publicUrl, {
      params: {
        page: page,
        limit: limit,
        search: search,
      },
    });
  }

  addProduct(product: Product) {
    console.log(product);
    return this.http.post(this.adminUrl, {
      code: product.code,
      name: product.name,
      description: product.description,
      packingSpec: product.packingSpec,
      price: product.price,
      element: product.element,
      uses: product.uses,
      subject: product.subject,
      guide: product.guide,
      preserve: product.preserve,
      trademarkId: product.trademarkId,
      originId: product.originId,
      categoryId: product.categoryId,
      images: product.images,
    });
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.adminUrl}/${product.id}`, {
        code: product.code,
        name: product.name,
        description: product.description,
        packingSpec: product.packingSpec,
        price: product.price,
        element: product.element,
        uses: product.uses,
        subject: product.subject,
        guide: product.guide,
        preserve: product.preserve,
        trademarkId: product.trademarkId,
        originId: product.originId,
        categoryId: product.categoryId,
        images: product.images,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(this.adminUrl + '/' + id);
  }
}
