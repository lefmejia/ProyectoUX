import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, getAuth} from 'firebase/auth';
import Swal from 'sweetalert2';
import { pizza } from '../models/pizza.model';
import { async, Observable } from '@firebase/util';
import firebase from '@firebase/app-compat';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PizzaServiceService {
  
  email = '';
  pass = '';
  nombre = '';
  direccion = ''; 

  constructor(public auth: AngularFireAuth, private router: Router, public db: AngularFireDatabase) {
    this.loggedIn = !!sessionStorage.getItem('user');
  }
  isAuthenticated = new BehaviorSubject<boolean>(false);
  public loggedIn = false;
  private user: Observable<firebase.default.User>;
  private userDetails: firebase.default.User = null;

  setCurrentUser(correo: string): void {
    sessionStorage.setItem('user', correo);
    this.loggedIn = true;
  }
  isAdmin(): boolean{
    

    if(this.auth.user){
      console.log(this.auth.user);
      return getAuth().currentUser.email === 'admin@gmail.com';
      
    }
    return false;
  }

  isLoggedIn() {
    return this.loggedIn;
}


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

    if (this.userDetails) {
      let correo = this.userDetails.email;
      console.log("hello im user" + " " + correo);
      // setting user in session here --->
      this.setCurrentUser(correo);
      } else {
          console.log("not working");
      }
  }

  logOut() {
    //console.log(getAuth().currentUser.email);
    sessionStorage.removeItem('user');
    this.loggedIn = false;
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
    if (this.userDetails) {
      let correo = this.userDetails.email;
      console.log("hello im user" + " " + correo);
      // setting user in session here --->
      this.setCurrentUser(correo);
      } else {
          console.log("not working");
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

  pizzaList: pizza[] = [
    // {
    //   id:1,
    //   imageUrl: "assets/img/4ESTACIONES.jpg",
    //   nombre: "4 Estaciones",
    //   precio: 250
    // },
    // {
    //   id:2,
    //   imageUrl: "assets/img/BUFFALOCHICKEN.png",
    //   nombre: "Buffalo Chicken",
    //   precio: 300,
    // },
    // {
    //   id:3,
    //   imageUrl: "assets/img/SUPREMA.jpg",
    //   nombre: "Suprema",
    //   precio: 220
    // }
  ]
  
}
