import { environment } from 'src/environments/environment.prod';
import { ProductI, UserCart, AugmentedProductI } from './../models/products';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  userCart: UserCart = {};
  userCartChange = new BehaviorSubject<UserCart>({});
  constructor(private _HttpClient: HttpClient) {
    this.userCartChange.subscribe((value) => {
      this.userCart = value;
    });
    let userId = localStorage.getItem('userId') || '1';
    let jsonCart: any = localStorage.getItem(`${userId}`);
    let userCartObj = JSON.parse(jsonCart) || {};
    this.userCartChange.next(userCartObj);
  }

  addCartItem(product: ProductI) {
    let id = product.id;
    console.log(this.userCart);
    if (!this.userCart.hasOwnProperty(id)) {
      let augmentedProduct: AugmentedProductI = { ...product, count: 0 };
      //! this will add an additional key of name 'augmentedProduct'
      this.userCart[id] = { augmentedProduct };
    }
    let addedProduct = { ...this.userCart[id] };
    addedProduct['augmentedProduct'].count++;
    this.userCart[id] = addedProduct;
    console.log(
      '🚀 ~ file: products.service.ts ~ line 40 ~ ProductsService ~ addCartItem ~  this.userCart',
      this.userCart
    );
    let stringifiedCart = JSON.stringify(this.userCart);
    //TODO make userId dynamic
    localStorage.setItem('1', stringifiedCart);
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
