import { UserCart } from './../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { LoginLogoutService } from './../../services/login-logout.service';
import {
  faCartShopping,
  faDoorOpen,
  faDoorClosed,
  faUser,
  faVest,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  faCartShopping = faCartShopping;
  faDoorOpen = faDoorOpen;
  faUser = faUser;
  faVest = faVest;
  faDoorClosed = faDoorClosed;
  isLogin = false;
  itemCount: number = 0;
  userId: number | string = '';
  loginSubscription: Subscription | undefined;
  productSubscription: Subscription | undefined;

  constructor(
    private _LoginLogoutService: LoginLogoutService,
    private _ProductService: ProductsService
  ) {
    this._LoginLogoutService.userChange.subscribe((value) => {
      this.isLogin = !!value;
    });
    this.loginSubscription = _LoginLogoutService.userIdChange.subscribe(
      (id) => {
        this.userId = id;
        this.productSubscription = _ProductService
          .userCartById(id)
          .subscribe((cart) => {
            this.getItemCartCount(cart);
          });
      }
    );
  }
  ngOnInit(): void {}
  getItemCartCount(cart: UserCart) {
    let count = 0;
    for (let id in cart) {
      count += cart[id].count;
    }
    this.itemCount = count;
  }
  logout() {
    this._LoginLogoutService.logoutUser();
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe;
    this.productSubscription?.unsubscribe;
  }
}
