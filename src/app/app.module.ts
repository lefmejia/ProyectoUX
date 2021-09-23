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
import { FormsModule } from '@angular/forms';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import { FormComponent } from './components/form/form.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { CartComponent } from './cart/cart/cart.component';
import { CrearComboComponent } from './crear-combo/crear-combo.component';
import { ComboDetailComponent } from './combo-detail/combo-detail.component';



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
    ProfileComponent,
    CartComponent,
    CrearComboComponent,
    ComboDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
