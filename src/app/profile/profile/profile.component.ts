import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, updateProfile } from "firebase/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombre:string;

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async editar(){
   (await this.auth.currentUser).updateProfile({
     displayName:this.nombre
   });
  }

}
