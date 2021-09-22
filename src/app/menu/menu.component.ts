import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { pizza } from '../models/pizza.model';
import { PizzaServiceService } from 'src/app/services/pizza-service.service';
import Swal from 'sweetalert2';
//auth
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzaList: any[];

  //user
  email: string;
  nombre: string;
  cantidad: number;
  closeResult = '';
  pizzaItem:any;

  constructor(public service: PizzaServiceService, private cartService: CartService, public auth: AngularFireAuth, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.db.list('menu').valueChanges().subscribe(productos => {
      console.log(productos);
      this.pizzaList = productos;
    });
    //this.pizzaList = this.service.pizzaList;

    this.pizzaList.forEach((a:any)=>{
      Object.assign(a, {quantity:1, total: a.precio})
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.pizzaItem = undefined;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addToCart(item: any, content)
  {
    console.log(this.pizzaItem);
    this.pizzaItem = item;
    this.open(content);
    // this.cartService.addToCart(item);
    // console.log(item);
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Pizza agregada al carrito!!!',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
  }

  submitOrder()
  {
    this.pizzaList.forEach((a:any)=>{
      if(a.id === this.pizzaItem.id)
      Object.assign(a, {quantity:this.cantidad, total: (a.precio * this.cantidad)})
    });
    this.cartService.addToCart(this.pizzaItem);
    console.log(this.pizzaItem);
    this.pizzaItem = undefined;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Pizza agregada al carrito!!!',
      showConfirmButton: false,
      timer: 1500
    })
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
