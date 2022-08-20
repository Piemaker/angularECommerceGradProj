import { LoginLogoutService } from './login-logout.service';
import { environment } from 'src/environments/environment.prod';
import {
  ProductI,
  AugmentedProductI,
  UserCarts,
} from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // state: [number | string, UserCarts];
  userId: number | string = '';
  userCarts: UserCarts = {};
  userCartsChange = new BehaviorSubject<UserCarts>({});

  userCartById = (userId: string | number) =>
    this.userCartsChange.pipe(map((carts) => carts[userId]));

  constructor(
    private _HttpClient: HttpClient,
    private _LoginLogoutService: LoginLogoutService
  ) {
    combineLatest(
      this._LoginLogoutService.userIdChange,
      this.userCartsChange
    ).subscribe(([userId, userCarts]) => {
      console.log("🚀 ~ file: products.service.ts ~ line 33 ~ ProductsService ~ ).subscribe ~ userId", userId)
      this.userId = userId;
      this.userCarts = userCarts;
      console.log(
        '🚀 ~ file: products.service.ts ~ line 36 ~ ProductsService ~ constructor ~ userCarts',
        userCarts
      );
    });
    let jsonCarts: any = localStorage.getItem(`userCarts`);
    let userCartsObj = JSON.parse(jsonCarts) || {};
    this.userCartsChange.next(userCartsObj);
  }

  addCartItem(product: ProductI) {
    let id = product.id;
    console.log(this.userCarts);
    let userCartsCopy: UserCarts = JSON.parse(JSON.stringify(this.userCarts));
    if (!userCartsCopy[this.userId]) {
      userCartsCopy = { ...userCartsCopy, [this.userId]: {} };
    }
    if (!userCartsCopy[this.userId].hasOwnProperty(id)) {
      let augmentedProduct: AugmentedProductI = { ...product, count: 0 };
      userCartsCopy[this.userId][id] = augmentedProduct;
    }
    let addedProduct = { ...userCartsCopy[this.userId][id] };
    addedProduct.count++;
    userCartsCopy[this.userId][id] = addedProduct;
    console.log(
      '🚀 ~ file: products.service.ts ~ line 40 ~ ProductsService ~ addCartItem ~  this.userCart',
      userCartsCopy
    );
    let stringifiedCarts = JSON.stringify(userCartsCopy);
    localStorage.setItem(`userCarts`, stringifiedCarts);
    this.userCartsChange.next(userCartsCopy);
  }

  getProducts(): Observable<ProductI[]> {
    return this._HttpClient.get<ProductI[]>(
      `${environment.productsBaseUrl}/products`
    );
  }
  getProduct(id: number): Observable<ProductI> {
    return this._HttpClient.get<ProductI>(
      `${environment.productsBaseUrl}/products/${id}`
    );
  }
  getProductsByCategory(category: string): Observable<ProductI[]> {
    return this._HttpClient.get<ProductI[]>(
      `${environment.productsBaseUrl}/products/category/${category}`
    );
  }
}
