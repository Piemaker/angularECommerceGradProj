import { AuthGuard } from './../../services/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'user', loadChildren: () => UserModule },
      { path: 'cart', loadChildren: () => CartModule },
      { path: 'products', loadChildren: () => ProductsModule },
      { path: 'products/details/:id', component: ProductDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
