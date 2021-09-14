import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PizzaServiceService } from 'src/app/services/pizza-service.service';
import {Email} from './../../../assets/smtp.js';
//declare let Email: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService, public service: PizzaServiceService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  sendEmail() {

    // this.service.auth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
    // });
    //[disabled]="this.products.length === 0"
    this.service.auth.user.subscribe((data) => {
      if(data == null){
        this.router.navigate(["/login"]);
        return;
      }
      else
      {
        let mensaje =`
        Detalle de la orden:<br/>
      `;
      this.products.forEach(product => {
        mensaje += `${product.nombre}\t\t    L. ${product.precio} <br/>`;
      });
  
      Email.send({
        Host: "smtp.gmail.com",
        Username: "crunchyrollpizza@gmail.com",
        Password: "Proyectoux123",
        From: "crunchyrollpizza@gmail.com",
        To: "crunchyrollpizza@gmail.com",
        Subject: "NUEVA ORDEN!!!!!",
        Body: mensaje,
      }).then(function (message) {
        alert("correo enviado exitosamente");
      });
      }
        this.cartService.removeAllCart();
    });
    
  }

}
