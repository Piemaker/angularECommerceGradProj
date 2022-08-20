import { ProductDetailsComponent } from './../product-details/product-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RatingDirective } from './directives/rating.directive';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    RatingDirective
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FontAwesomeModule

  ]
})
export class ProductsModule { }
