import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { StockInfo } from 'src/app/stock-info';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  stockId =0;
  stockInfo : StockInfo|undefined ={name: '', id :0, price:0, count:0, description :''};
  imageState = 'small';

  constructor(private activatedRouter: ActivatedRoute,
    private dataservice: DataService,
    private router: Router) {

    this.activatedRouter.params.subscribe((params)=>{
      this.stockId = params['id'];
      console.log(this.stockId);
      this.stockInfo = this.dataservice?.productDetails.find((d: StockInfo)=> d.id.toString() === this.stockId.toString());
     }
    )

   }

  ngOnInit(): void {
  }

  navigateTo(){
    this.dataservice.setProuctShow(true);
    this.router.navigate(['/product']);

  }

  

}
