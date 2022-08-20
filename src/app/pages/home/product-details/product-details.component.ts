import { getRatingArr } from './../../../common/common-module/common';
import { ActivatedRoute } from '@angular/router';
import { ProductI } from './../../../models/products';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  faAdd = faAdd;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  product: ProductI = {
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
  };
  id: number = 0;
  ratingArr: number[] = [];
  message = '';
  isButtonDisabled = false;
  constructor(
    public _ProductService: ProductsService,
    private _Router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ratingArr = getRatingArr(this.product.rating.rate);

    this.id = Number(this._Router.snapshot.paramMap.get('id'));

    this._ProductService.getProduct(this.id).subscribe((product) => {
      this.product = product;
    });
  }
  setHideMessage(message: string) {
    this.message = `${message} has been added to cart`;
    this.disableAddButton()
    setTimeout(() => {
      this.message = '';
      this.enableAddButton()
    }, 500);
  }
  disableAddButton() {
    this.isButtonDisabled = true;
  }
  enableAddButton() {
    this.isButtonDisabled = false;
  }
  handleClick(product: ProductI) {
    // TODO add logic to add cart to local storage
    this._ProductService.addCartItem(product)
    this.setHideMessage(product.title);
  }
}
