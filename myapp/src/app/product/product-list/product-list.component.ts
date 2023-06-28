import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { StockInfo } from 'src/app/stock-info';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  productList: StockInfo[] = [];
  showProduct : boolean= true;
  constructor(private dataService: DataService,
    private router : Router,
    private route: ActivatedRoute) {
    if(this.dataService.shoppoingCart && this.dataService.shoppoingCart.length === 0){
    this.getStock();
    }else {
      this.productList = this.dataService.productDetails;
    }
    this.dataService.proudctList$.subscribe(value =>{
      this.showProduct = value;
    })
  }

  ngOnInit(): void {
  }


  getStock(): void {
    this.dataService.getStock()
      .subscribe((data: StockInfo[]) => {
          this.productList = data;
      }
      )
  }

  stockIncrement(item: StockInfo) {
    item.count = item.count + 1;
    item.isIncr = true;
    this.dataService.updatedData(item);
  }

  stockDecrement(item: StockInfo) {
    if (item.count === 0) {
      return;
    }
    item.count = item.count - 1;
    item.count = item.count < 0 ? 0 : item.count;
    item.isIncr = false;
    this.dataService.updatedData(item);
  }

  cardDetails(item : StockInfo){
    this.showProduct = false;
    this.dataService.setProuctShow(this.showProduct);
    this.router.navigate([`./details/${item.id}`], {relativeTo: this.route});
  }

}
