import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PizzaServiceService } from 'src/app/services/pizza-service.service';
import Swal from 'sweetalert2';
import { Email } from './../../../assets/smtp.js';
//declare let Email: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;

  constructor(
    private cartService: CartService,
    public service: PizzaServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(product:any):void{
    // this.cartService.removeCartItem(product);
    this.cartService.removeAllCart();
    this.grandTotal = this.cartService.getTotalPrice();
  }

  //generar id de compra
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
  

  async sendEmail() {
    //crear un id para la orden
    var token = this.makeid(10)

    //inout de la direccio de la orden
    
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Direccion para la orden => ' + token,
      inputPlaceholder: 'Ingrese direccion para la orden...',
      inputAttributes: {
        'aria-label': 'Ingrese direccion...'
      },
    })

    this.service.auth.user.subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/login']);
        return;
      } else {
        let mensaje = `
        Detalle de la orden:<br/>
      `;
        this.products.forEach((product) => {
          mensaje += `${product.nombre}\t\t    L. ${product.precio} x${product.quantity} <br/>`;
        });
        mensaje += ` _____________________________________________<br/>Total: L. ${this.grandTotal}`;
        mensaje += `<br/> <br/> Direccion para la orden: \t ${text}`;

        if (this.grandTotal > 0) {
          Email.send({
            Host: 'smtp.gmail.com',
            Username: 'crunchyrollpizza@gmail.com',
            Password: 'Proyectoux123',
            From: 'crunchyrollpizza@gmail.com',
            To: 'crunchyrollpizza@gmail.com',
            Subject: 'NUEVA ORDEN!!         Id Order: ' + token,
            Body: mensaje,
          }).then(function (message) {
            Swal.fire('Orden Confirmada!!!!', 'Buen provecho!!!!', 'success').then(function(){
              //this.cartService.removeAllCart();
              window.location.reload();
            });
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay nada en el carrito!',
            footer: '<a href="/menu">Ve al menu!</a>'
          })
        }
      }
    });
  }
}
