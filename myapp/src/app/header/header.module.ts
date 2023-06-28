import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ProductModule } from '../product/product.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProductModule
  ],
  exports :[
    HeaderComponent
  ]
})
export class HeaderModule { }
