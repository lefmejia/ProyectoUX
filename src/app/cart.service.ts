import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartList: any = [];
  public productList =  new BehaviorSubject<any>([]);

  constructor() { }

  getProducts()
  {
    return this.productList.asObservable();
  }

  setProduct(product: any)
  {
    this.cartList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any)
  {
    this.cartList.push(product);
    this.productList.next(this.cartList);
    this.getTotalPrice();
  }

  getTotalPrice():number
  {
    let granTotal = 0;
    this.cartList.map((a:any)=>{
      granTotal += a.total;
    })
    return granTotal;
  }

  removeCartItem(product: any){
    this.cartList.map((a:any, index:any)=>{
      if(product.id === a.id)
      {
        this.cartList.splice(index, 1);
      }
    })
  }

  removeAllCart()
  {
    this.cartList = [];
    this.productList.next(this.cartList);
  }
}
