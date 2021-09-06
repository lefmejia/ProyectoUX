import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  email;
  password;
  nombre;
  apellido;
  username;
  phoneNumber;

  tieneDatos: boolean = true;

  constructor(private router: Router) {}

  fnSalvar(data) {
    
  }
  fnCheck(data) {
    debugger;
    console.log(data);
  }

  ngOnInit(): void {
  }

}
