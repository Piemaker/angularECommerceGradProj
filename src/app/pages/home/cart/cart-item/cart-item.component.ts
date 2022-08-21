import { LoginLogoutService } from './../../../../services/login-logout.service';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../../services/products.service';
import { AugmentedProductI } from './../../../../models/products';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input()
  productObj: AugmentedProductI = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
    count: 0,
  };
  faPlus = faPlus;
  faMinus = faMinus;
  userId: string | number = '';
  totalPrice: number = 0;
  productSubscription: Subscription | undefined;
  loginSubscription: Subscription | undefined;

  constructor(
    private _ProductService: ProductsService,
    private _LoginLogoutService: LoginLogoutService
  ) {}
  getTotalProductsPrice() {
    this.totalPrice = this.productObj.count * this.productObj.price;
  }
  handleIncrease(productId: number | string) {
    this._ProductService.increaseCartItemCount(productId);
  }

  handleDecrease(productId: number | string) {
    this._ProductService.decreaseCartItemCount(productId);
  }

  ngOnInit(): void {
    this.getTotalProductsPrice();
  }
}
