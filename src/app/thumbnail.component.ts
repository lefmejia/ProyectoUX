import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "./services/cart.service";
import { PizzaServiceService } from "src/app/services/pizza-service.service";

@Component({
  selector: "pizza-thumbnail",
  template: `
    <div class="thumbnail">
      <div>
       <img src={{pizzaUx.imageUrl}} width="300">
      </div>
      <div class="thumbnail-text">
        <h1><strong>{{ pizzaUx.nombre }}</strong></h1>
        <div class="thumblink">
          <a class="btn btn-primary">Pedir Ahora</a>
          <a class="btn btn-secondary" (click)="addToCart(pizzaUx)">Agregar al carrito</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      h2,
      strong,
      span {
        color: black;
      }
      .espaciador {
        margin-left: 1em;
      }
      .colorVerde {
        color: green;
      }
      .colorNaranja {
        color: purple;
      }
      .btn-primary{
        background: hsl(0, 0%, 50%);;
        border: none;
        flex: 1;
      }
      .btn-primary:hover{
        background: hsl(0, 0%, 20%);;
      }
      .btn-secondary{
        background: hsl(39, 100%, 50%);
        border: none;
      }
      .btn-secondary:hover{
        background: hsl(39, 100%, 35%);
      }
    `,
  ],
})
export class PizzaThumbnailComponent {
  @Input() pizzaUx: any;
  @Output() evtpizzaUx = new EventEmitter();

  constructor(private router: Router, public service: PizzaServiceService, private cartService: CartService) {}

  addToCart(item: any){
    this.evtpizzaUx.emit(item);
    
  }

  clickMe(id) {
    // this.evtpizzaUx.emit(this.pizzaUx.nombre);
    this.router.navigate(["/clases", id]);
    // this.router.navigateByUrl(`/clases/${id}`);
  }

}
