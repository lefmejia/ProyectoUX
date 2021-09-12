import { ViewChild } from "@angular/core";
import { Routes } from "@angular/router";
import { CartComponent } from "./cart/cart/cart.component";
import { FormComponent } from "./components/form/form.component";
import { CrearCuentaComponent } from "./crear-cuenta/crear-cuenta.component";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { WelcomeComponent } from "./welcome.component";


//localhost:4200/clases
export const AppRoutes: Routes = [
  
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "menu",
    component: MenuComponent,
    //canDeactivate: [ClassRouteDeactivate],
  },
  {
    path: "signup",
    component: CrearCuentaComponent,
    //canActivate: [ClaseRouteActivate],
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  {path: "profile", component:ProfileComponent},
  {path: "cart", component:CartComponent},
  {path: "menu", component:MenuComponent}
  //{ path: "404", component: Clase404Component },
  
];