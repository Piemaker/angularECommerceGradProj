import { Subscription } from 'rxjs';
import { LoginLogoutService } from './../../../services/login-logout.service';
import { UserCart } from './../../../models/products';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  userCart: UserCart = {};
  userId: number | string = '';
  loginSubscription: Subscription | undefined;
  productSubscription: Subscription | undefined;
  faBackward = faBackward;
  faXmark = faXmark;
  itemCount = 0;
  totalPrice = 0;

  constructor(
    private _ProductService: ProductsService,
    private _LoginLogoutService: LoginLogoutService
  ) {
    this.loginSubscription = _LoginLogoutService.userIdChange.subscribe(
      (id) => {
        this.userId = id;
        this.productSubscription = _ProductService
          .userCartById(id)
          .subscribe((cart) => {
            this.userCart = cart;
            this.getItemCount();
            this.getTotalPrice();
          });
      }
    );
  }

  getItemCount() {
    let totalCount = 0;
    for (const id in this.userCart) {
      totalCount += this.userCart[id].count;
    }
    this.itemCount = totalCount;
  }
  getTotalPrice() {
    let totalPrice = 0;
    for (const id in this.userCart) {
      totalPrice += this.userCart[id].count * this.userCart[id].price;
    }
    this.totalPrice = totalPrice;
  }
  handleClear() {
    this._ProductService.clearCart()
  }
  ngOnInit(): void {
    console.log('onInit called');
    this.getItemCount();
    this.getTotalPrice();
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe;
    this.productSubscription?.unsubscribe;
  }
}
