import { environment } from 'src/environments/environment.prod';
import { ProductI } from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}

  getProducts(): Observable<ProductI[]> {
    return this._HttpClient.get<ProductI[]>(
      `${environment.productsBaseUrl}/products`
    );
  }
  getProduct(id: number): Observable<ProductI[]> {
    return this._HttpClient.get<ProductI[]>(
      `${environment.productsBaseUrl}/products/${id}`
    );
  }
  getProductsByCategory(category: string): Observable<ProductI[]> {
    return this._HttpClient.get<ProductI[]>(
      `${environment.productsBaseUrl}/products/category/${category}`
    );
  }
}
