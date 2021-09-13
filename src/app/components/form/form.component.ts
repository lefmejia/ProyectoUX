import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider } from 'firebase/auth';
import { PizzaServiceService } from 'src/app/services/pizza-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() action: string;

  email = '';
  pass = '';
  nombre = '';
  direccion = '';

  constructor(public auth: AngularFireAuth, private router: Router, public service:PizzaServiceService) {}

  ngOnInit(): void {
    console.log(this.action);
  }

  loginWithGoogle() {
    this.service.loginWithGoogle();
  }

  logOut() {
    this.service.logOut();
  }

  customLogin() {
    
    this.service.email = this.email;
    this.service.pass = this.pass;
    this.service.nombre = this.nombre;
    this.service.direccion = this.direccion;
    this.service.customLogin();
  }

  register() {
    this.service.email = this.email;
    this.service.pass = this.pass;
    this.service.nombre = this.nombre;
    this.service.direccion = this.direccion;
    this.service.register();
  }
}
