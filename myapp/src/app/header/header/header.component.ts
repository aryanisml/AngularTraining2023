import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { StockInfo } from 'src/app/stock-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  totalCountLabel : string = 'Total count is';
  totalCount = 0;
  constructor(private dataService : DataService,
    private router : Router) { 
    this.getTotalCount();
  }

  ngOnInit(): void {
  }

  getTotalCount():void {
    this.dataService.data$.subscribe((data: StockInfo) => {
      if(data && data.name!==''){
        this.totalCount = data.isIncr ? this.totalCount+1 : (this.totalCount-1);
        this.totalCount = this.totalCount < 0 ? 0 : this.totalCount;
      }
    })
  }

  navigateTo() {
     this.router.navigate(['/cartdetails']);
  }
}
