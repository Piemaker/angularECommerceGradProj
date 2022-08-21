import { AuthGuard } from './../../services/auth.guard';
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
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'user', canActivate: [AuthGuard],loadChildren: () => UserModule },
      { path: 'cart', canActivate: [AuthGuard],loadChildren: () => CartModule },
      { path: 'products', loadChildren: () => ProductsModule },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
