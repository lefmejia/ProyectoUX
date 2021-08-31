import { Component, OnInit } from '@angular/core';
import { pizza } from '../models/pizza.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzaList: pizza[];


  constructor() { }

  ngOnInit(): void {

    this.pizzaList = [
      {
        id:1,
        imageUrl: "assets/img/4ESTACIONES.jpg",
        nombre: "4 Estaciones"
      },
      {
        id:2,
        imageUrl: "assets/img/BUFFALOCHICKEN.png",
        nombre: "Buffalo Chicken"
      },
    ]
  }

}
