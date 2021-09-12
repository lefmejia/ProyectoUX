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
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        (await this.auth.currentUser).updateProfile({
          displayName: this.nombre,
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  async editarEmail() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        (await this.auth.currentUser).updateEmail(this.email);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  async editarPassword() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        (await this.auth.currentUser).updatePassword(this.password);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
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

  noLogIn() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No estas loggeado!',
      footer: '<a href="/login">Log In</a>',
    });
  }
}
