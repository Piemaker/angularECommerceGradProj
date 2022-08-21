import { LoginLogoutService } from './login-logout.service';
import { environment } from 'src/environments/environment.prod';
import { ProductI, AugmentedProductI, UserCarts } from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, combineLatest, filter } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // state: [number | string, UserCarts];
  userId: number | string = '';
  userCarts: UserCarts = {};
  userCartsChange = new BehaviorSubject<UserCarts>({});

  userCartById = (userId: string | number) => {
    //! Id doesn't seem to be string
    let id = userId + '';
    return this.userCartsChange.pipe(
      map((carts) => {
        return carts[id];
      })
    );
  };
  constructor(
    private _HttpClient: HttpClient,
    private _LoginLogoutService: LoginLogoutService
  ) {
    combineLatest(
      this._LoginLogoutService.userIdChange,
      this.userCartsChange
    ).subscribe(([userId, userCarts]) => {
      this.userId = userId;
      this.userCarts = userCarts;
    });

    let jsonCarts: any = localStorage.getItem(`userCarts`);
    let userCartsObj = JSON.parse(jsonCarts) || {};
    this.userCartsChange.next(userCartsObj);
  }

  addCartItem(product: ProductI) {
    let id = product.id;
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
    let stringifiedCarts = JSON.stringify(userCartsCopy);
    localStorage.setItem(`userCarts`, stringifiedCarts);
    this.userCartsChange.next(userCartsCopy);
  }

  increaseCartItemCount(productId: number | string) {
    let userCartsCopy: UserCarts = JSON.parse(JSON.stringify(this.userCarts));
    // spread operator won't suffice
    let userProductCopy = JSON.parse(
      JSON.stringify(userCartsCopy[this.userId])
    );

    userProductCopy[productId].count++;

    userCartsCopy[this.userId] = userProductCopy;
    let stringifiedCarts = JSON.stringify(userCartsCopy);
    localStorage.setItem(`userCarts`, stringifiedCarts);
    this.userCartsChange.next(userCartsCopy);
  }

  decreaseCartItemCount(productId: number | string) {
    let userCartsCopy: UserCarts = JSON.parse(JSON.stringify(this.userCarts));
    // spread operator won't suffice
    let userProductCopy = JSON.parse(
      JSON.stringify(userCartsCopy[this.userId])
    );
    if (userProductCopy[productId].count <= 1) {
      this.deleteCartItem(productId);
    } else {
      userProductCopy[productId].count--;
      userCartsCopy[this.userId] = userProductCopy;
      let stringifiedCarts = JSON.stringify(userCartsCopy);
      localStorage.setItem(`userCarts`, stringifiedCarts);
      this.userCartsChange.next(userCartsCopy);
    }
  }

  deleteCartItem(productId: number | string) {
    let userCartsCopy: UserCarts = JSON.parse(JSON.stringify(this.userCarts));
    delete userCartsCopy[this.userId][productId];
    if (Object.keys(userCartsCopy[this.userId]).length !== 0) {
      let stringifiedCarts = JSON.stringify(userCartsCopy);
      localStorage.setItem(`userCarts`, stringifiedCarts);
      this.userCartsChange.next(userCartsCopy);
    } else {
      this.clearCart();
    }
  }

  clearCart() {
    let userCartsCopy: UserCarts = JSON.parse(JSON.stringify(this.userCarts));
    delete userCartsCopy[this.userId];
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
