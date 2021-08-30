import { Component } from "@angular/core";

@Component({
  selector: "crunchy-navbar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .navbar-default {
        background-color: #bc93e4;
        color: white;
      }

      a {
        color: white;
      }
    `,
  ],
})
export class NavBarComponent {}
