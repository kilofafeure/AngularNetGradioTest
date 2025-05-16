import { Component } from '@angular/core';
/*import { LoginComponent } from '../app/pages/login/login.component';*/
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [ RouterModule ]
})
export class AppComponent
{
  constructor() {}
}
