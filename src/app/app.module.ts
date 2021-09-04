import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome.component';
import { NavBarComponent } from './nav/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponentComponent } from './test-component/test-component.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './routes';
import { HttpClientModule } from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { LoginComponent } from './login/login.component';
import { PizzaThumbnailComponent } from './thumbnail.component';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { ProfileComponent } from './profile/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavBarComponent,
    TestComponentComponent,
    MenuComponent,
    CrearCuentaComponent,
    LoginComponent,
    PizzaThumbnailComponent,
    FormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
