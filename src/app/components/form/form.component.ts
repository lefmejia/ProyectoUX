import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
//import { Auth, GoogleAuthProvider } from 'firebase/auth';
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
    // this.auth.signInWithPopup(new GoogleAuthProvider()).then((res) => {
    //   this.router.navigate(['welcome']);
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: 'LogIn Succesful',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // });
    this.service.loginWithGoogle();
  }

  logOut() {
    // this.auth.signOut();
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'warning',
    //   title: 'LogOut Succesful',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    this.service.logOut();
  }

  customLogin() {
    // if (this.email == '' || this.pass == '') {
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'warning',
    //     title: 'Los campos no deben de estar vacios',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // } else {
    //   this.auth
    //     .signInWithEmailAndPassword(this.email, this.pass)
    //     .then((res) => {
    //       console.log(res);
    //       this.router.navigate(['welcome']);
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'LogIn Succesful',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     })
    //     .catch((err) =>
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Usuario no encontrado',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       })
    //     );
    // }
    this.service.email = this.email;
    this.service.pass = this.pass;
    this.service.nombre = this.nombre;
    this.service.direccion = this.direccion;
    this.service.customLogin();
  }

  register() {
  //   if (this.email == '' || this.pass == '' || this.nombre =='' || this.direccion=='') {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'warning',
  //       title: 'Los campos no deben de estar vacios',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   } else {
  //   this.auth
  //     .createUserWithEmailAndPassword(this.email, this.pass)
  //     .then(async (user) => {
  //       console.log(user);
  //       this.router.navigate(['login']);
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Cuenta creada exitosamente',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       (await this.auth.currentUser).updateProfile({
  //         displayName: this.nombre,
  //       });
  //     })
  //     .catch((err) => console.log('Error user: ', err));
  //   }
    this.service.email = this.email;
    this.service.pass = this.pass;
    this.service.nombre = this.nombre;
    this.service.direccion = this.direccion;
    this.service.register();
  }
}
