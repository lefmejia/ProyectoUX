import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { pizza } from '../models/pizza.model';
import { PizzaServiceService } from 'src/app/services/pizza-service.service';
import Swal from 'sweetalert2';
//auth
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzaList: any[];

  //user
  email: string;
  nombre: string;

  constructor(public service: PizzaServiceService, private cartService: CartService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.service.db.list('menu').valueChanges().subscribe(productos => {
      console.log(productos);
      this.pizzaList = productos;
    });
    //this.pizzaList = this.service.pizzaList;

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

  async mostrar() {
    const user = this.auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = (await user).displayName;
      const email = (await user).email;
    }
  }
}
