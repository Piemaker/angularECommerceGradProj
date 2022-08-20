import { LoginLogoutService } from './../../../services/login-logout.service';
import { UserCart } from './../../../models/products';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userCart: UserCart = {};
  userId: number | string = '';
  constructor(
    private _ProductService: ProductsService,
    private _LoginLogoutService: LoginLogoutService
  ) {
    _LoginLogoutService.userIdChange.subscribe((id) => {
      this.userId = id;
      _ProductService.userCartById(id).subscribe((cart) => {
        this.userCart = cart;
      });
    });
  }

  ngOnInit(): void {}
}
