import { Component, OnInit, HostListener } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { PizzaServiceService } from '../services/pizza-service.service';
import { getDatabase, set, query } from "firebase/database";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-crear-combo',
  templateUrl: './crear-combo.component.html',
  styleUrls: ['./crear-combo.component.css']
})
export class CrearComboComponent implements OnInit {

  error: string;
  dragAreaClass: string;
  draggedFiles: any;
  fileList: any[];
  

  nombre;
  precio;
  id:number;

  constructor(public service: PizzaServiceService) { }

  ngOnInit(): void {
  }

  onDragOver(event) {
    event.preventDefault();
  }

  // From drag and drop
  onDropSuccess(event) {
      event.preventDefault();

      this.onFileChange(event.dataTransfer.files);    // notice the "dataTransfer" used instead of "target"
  }

  // From attachment link
  onChange(event) {
      this.onFileChange(event.target.files);    // "target" is correct here
  }

  private onFileChange(files: File[]) {
    this.fileList = files;
    console.log(files[0].name);
  }

  getMenuItemID(url){
    //const topUserPostsRef = query(ref(db, 'user-posts/'), orderByChild('starCount'))
    // this.service.db.object('menu').valueChanges().subscribe(item =>{
    //   console.log(item);
    // });

    this.service.db.object('menu').valueChanges().pipe(take(1)).subscribe(item =>{
        //console.log(item[Object.keys(item)[Object.keys(item).length -1]]['id']);
        
        this.writeUserData(url, item[Object.keys(item)[0]]['id']+1); //Object.keys(item).length -1
        //console.log(id);
        //return id;//[Object.keys(item)[Object.keys(item).length -2]];
    });
  }

  writeUserData(imageUrl, itemid) {
    let menuItem = {};
    menuItem = {
      "id" : itemid,
      "imageUrl" : imageUrl,
      "nombre" : this.nombre,
      "precio" : this.precio
    }
    this.service.db.list('menu').push(menuItem);
  }

  saveCombo() {

    // if (files.length > 1) this.error = "Only one file at time allow";
    // else {
    //   this.error = "";
    //   console.log(files[0].size,files[0].name,files[0].type);
    //   this.draggedFiles = files;
    //   console.log(files);
    // }
    let filename = this.fileList[0].name;
    
    const storage = getStorage();
    const storageRef = ref(storage, filename);
    console.log('algo1');

    uploadBytes(storageRef, this.fileList[0]).then((snapshot) => {
      
      
    }).then(
      ()=>{
        getDownloadURL(storageRef).then(data =>{
    
          this.getMenuItemID(data);
        }).catch((error)=>{
    
        });
      }
    );

  }  

}
