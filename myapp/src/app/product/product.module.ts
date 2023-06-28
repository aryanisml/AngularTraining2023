import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartDetailsComponent } from './shopping-cart-details/shopping-cart-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: 'product', component: ProductListComponent,
    children : [
      {
        path:'details/:id',
        component : ProductDetailsComponent
      }
    ]
  },
  {
    path: 'cartdetails', component: ShoppingCartDetailsComponent
  },
  {
    path: '', redirectTo: '/product', pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    ProductListComponent,
    ShoppingCartDetailsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports : [
    ProductListComponent,
    ShoppingCartDetailsComponent
  ]
})
export class ProductModule { }
