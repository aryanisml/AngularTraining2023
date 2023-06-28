import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { StockInfo } from 'src/app/stock-info';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss']
})
export class ShoppingCartDetailsComponent implements OnInit {

  cartIteamCount:StockInfo[] = [];
  constructor(private dataService:DataService,
    private router: Router) { 
    this.getCartItem();
  }

  ngOnInit(): void {
  }

  getCartItem():void{
    this.dataService.dataArray$.subscribe((data : StockInfo[]) => {
      this.cartIteamCount= [...data.filter(d =>d.count!==0)];
    })
  }
    navigateTo(){
      this.dataService.setProuctShow(true);
     this.router.navigate(['']);
    }
  
}
