import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { pizza } from '../models/pizza.model';
import { PizzaServiceService } from 'src/app/services/pizza-service.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Pizza agregada al carrito!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }


  crearOrden(){
    
  }

}
