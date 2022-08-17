import { Component } from '@angular/core';
import { FetchDataService } from '../../../services/fetch-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: any = [];
  constructor(public _FetchDataService: FetchDataService) {
    this._FetchDataService.getData().subscribe((data) => {
      this.products = data;
      this.products.pop();
      this.products.pop();
      console.log("get product", data);
    });
  }


}
