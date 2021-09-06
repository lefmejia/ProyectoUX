import { Component } from "@angular/core";
import { PizzaServiceService } from "../pizza-service.service";

@Component({
  selector: "crunchy-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls:['./navbar.component.css']
})
export class NavBarComponent {
  constructor(public service: PizzaServiceService){

  }

  llamarLogOut()
  {
    this.service.logOut();
  }
}
