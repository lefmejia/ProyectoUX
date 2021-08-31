import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

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
          <a class="btn btn-secondary">Agregar al carrito</a>
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
        background: black;
        border: none;
        flex: 1;
      }
      .btn-secondary{
        background: orange;
        border: none;
      }
    `,
  ],
})
export class PizzaThumbnailComponent {
  @Input() pizzaUx: any;
  @Output() evtpizzaUx = new EventEmitter();

  constructor(private router: Router) {}

  clickMe(id) {
    // this.evtpizzaUx.emit(this.pizzaUx.nombre);
    this.router.navigate(["/clases", id]);
    // this.router.navigateByUrl(`/clases/${id}`);
  }

}
