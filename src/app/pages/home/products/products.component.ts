import { ProductI } from './../../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { categories } from 'src/app/common/common-module/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productArr: ProductI[] = [];
  productSubscription: Subscription | undefined;
  productByCategorySubscription: Subscription | undefined;

  categories = categories;
  selectedCategory: string = '';

  constructor(public _ProductService: ProductsService) {}
  ngOnInit() {
    this.productSubscription = this._ProductService
      .getProducts()
      .subscribe((data) => {
        this.productArr = data;
      });
  }

  onFilterCategory(category: string) {
    this.selectedCategory = category;
    this.productByCategorySubscription = this._ProductService
      .getProductsByCategory(category)
      .subscribe((filteredProducts) => {
        this.productArr = filteredProducts;
      });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
    this.productByCategorySubscription?.unsubscribe();
  }
}
