import { Routes } from "@angular/router";
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
  {path: "profile", component:ProfileComponent}
  //{ path: "404", component: Clase404Component },
  
];