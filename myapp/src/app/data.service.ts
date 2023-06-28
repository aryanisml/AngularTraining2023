import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, scheduled } from 'rxjs';
import { StockInfo } from './stock-info';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject : BehaviorSubject<StockInfo> = new BehaviorSubject<StockInfo>({name :'', id : 0, price:0, count: 0, isIncr: false, description:''});
  private dataSubjectArray : BehaviorSubject<StockInfo[]> = new BehaviorSubject<StockInfo[]>([]);
  private productListSubject : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(true);

  public data$ = this.dataSubject.asObservable();
  public dataArray$ = this.dataSubjectArray.asObservable();
  public proudctList$ = this.productListSubject.asObservable();

  shoppoingCart: StockInfo[] = [];
  productDetails: StockInfo[] =[];

  updatedData(newValue : StockInfo){
     this.dataSubject.next(newValue);
     this.updatedShopingCart(newValue);
  }

  setProuctShow(value : boolean){
  this.productListSubject.next(value);
  }

  updatedShopingCart(newValue : StockInfo){
    const cartData = this.shoppoingCart.find((result : StockInfo) => result.name ===  newValue.name);
    if(cartData && Object.keys(cartData).length > 0 ){
       cartData.count = newValue.isIncr ?  cartData.count ++ : cartData.count --;
    }else {
      this.shoppoingCart.push(newValue);
    }
    this.dataSubjectArray.next(this.shoppoingCart);
    console.log(this.productDetails);
  }


  constructor(private http: HttpClient) { }

  getStock(): Observable<StockInfo[]> {
    return this.http.get<StockInfo[]>(`http://localhost:3000/stocks`)
      .pipe(
        map((data: StockInfo[]) => {
          this.productDetails= data.map((item: StockInfo) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            count : 0,
            path : item.path,
            description: item.description
          }))
          return [...this.productDetails];
        })
      );
  }
}
