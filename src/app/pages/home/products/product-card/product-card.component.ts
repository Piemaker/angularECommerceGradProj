import { ProductI } from './../../../../models/products';
import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  @Input()
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
  ratingArr: number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.ratingArr = this.getRatingArr(this.product.rating.rate);
  }
  // to correctly render the stars
  getRatingArr(rating: number): number[] {
    let ratingArr = [];
    for (let i = 0; i < 5; i++) {
      let ratingValue = rating;
      rating -= 1;
      ratingArr.push(rating);
    }
    return ratingArr;
  }
}
