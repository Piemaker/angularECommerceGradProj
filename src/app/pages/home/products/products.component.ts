import { ProductI } from './../../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productArr: ProductI[] = [];
  productSubscription: Subscription | undefined;

  constructor(public _ProductService: ProductsService) {}
  ngOnInit() {
    this.productSubscription = this._ProductService
      .getProducts()
      .subscribe((data) => {
        this.productArr = data;
      });
  }
}
