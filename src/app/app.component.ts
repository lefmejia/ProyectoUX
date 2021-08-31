import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  template: `
    <crunchy-navbar></crunchy-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'proyecto';
}
