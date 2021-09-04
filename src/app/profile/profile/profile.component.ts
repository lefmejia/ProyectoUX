import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  direccion: string;

  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async editarNombre() {
    (await this.auth.currentUser).updateProfile({
      displayName: this.nombre,
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Nombre Modificado Correctamente',
      showConfirmButton: false,
      timer: 1000,
    });
  }
  async editarEmail() {
    (await this.auth.currentUser).updateEmail(this.email)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Email Modificado Correctamente',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  async editarPassword() {
    (await this.auth.currentUser).updatePassword(this.password)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Password Modificada Correctamente',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  async mostrar() {
    const user = this.auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = (await user).displayName;
      const email = (await user).email;
    }
  }
}
