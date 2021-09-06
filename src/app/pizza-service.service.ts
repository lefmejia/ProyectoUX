import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PizzaServiceService {
  
  email = '';
  pass = '';
  nombre = '';
  direccion = '';

  constructor(public auth: AngularFireAuth, private router: Router) {}
  isAuthenticated = new BehaviorSubject<boolean>(false);

  loginWithGoogle() {
    this.auth.signInWithPopup(new GoogleAuthProvider()).then((res) => {
      this.router.navigate(['welcome']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'LogIn Succesful',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  logOut() {
    this.auth.signOut();
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'LogOut Succesful',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  customLogin() {
    if (this.email == '' || this.pass == '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Los campos no deben de estar vacios',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then((res) => {
          console.log(res);
          this.router.navigate(['welcome']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'LogIn Succesful',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) =>
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Usuario no encontrado',
            showConfirmButton: false,
            timer: 1500,
          })
        );
    }
  }

  register() {
    if (this.email == '' || this.pass == '' || this.nombre =='' || this.direccion=='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Los campos no deben de estar vacios',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
    this.auth
      .createUserWithEmailAndPassword(this.email, this.pass)
      .then(async (user) => {
        console.log(user);
        this.router.navigate(['login']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cuenta creada exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        (await this.auth.currentUser).updateProfile({
          displayName: this.nombre,
        });
      })
      .catch((err) => console.log('Error user: ', err));
    }
  }
}
