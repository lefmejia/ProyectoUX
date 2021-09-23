import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { PizzaServiceService } from '../services/pizza-service.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, ref as dbref, set, onValue } from "firebase/database";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-combo-detail',
  templateUrl: './combo-detail.component.html',
  styleUrls: ['./combo-detail.component.css']
})
export class ComboDetailComponent implements OnInit {
  combo: any;
  reviews:any[];
  contenido;
  parent:any;
  combos: Observable<any[]>;
  constructor(public service: PizzaServiceService, private routes: ActivatedRoute, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.service.db.list('menu').valueChanges().subscribe(productos => {
      let keys = Object.keys(productos);
      console.log(productos);
      keys.forEach((item)=>{
          if(productos[item]['id'] == this.routes.snapshot.params['id'])
          {
            this.combo = productos[item];
            this.reviews = productos[item]['reviews'];
            this.parent = item;
          }
      });
      
    });
  }

  private findKey(id: number): Promise<string> {
    const refe = this.service.db.database.ref();
    let key: string;
  
    return refe.child('menu').orderByChild('id').equalTo(id).once('value').then(snap => {
      snap.forEach(data => {
        //console.log(data.key)
        key = data.key;
      })
      return key;
    })
  }

  fnSalvar(usuario)
  {
    let menuItem = {};
    menuItem = {
      "usuario" : usuario,
      "contenido" : this.contenido
    }
    const db = getDatabase();
    this.findKey(this.combo['id']).then(key =>{
      this.service.db.list('menu/'+key+'/reviews').push(menuItem);
    })
  }

}
