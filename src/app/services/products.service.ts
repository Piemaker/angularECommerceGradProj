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
      'https://fakestoreapi.com/products/'
    );
  }
}
