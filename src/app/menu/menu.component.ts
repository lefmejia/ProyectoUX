import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { pizza } from '../models/pizza.model';
import { PizzaServiceService } from '../pizza-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzaList: pizza[];


  constructor(public service: PizzaServiceService, private cartService: CartService) { }

  ngOnInit(): void {

    this.pizzaList = this.service.pizzaList;

    this.pizzaList.forEach((a:any)=>{
      Object.assign(a, {quantity:1, total: a.precio})
    });
  }

  addToCart(item: any)
  {
    this.cartService.addToCart(item);
    console.log(item);
  }

}
