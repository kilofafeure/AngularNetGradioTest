import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
//import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

const materialModules = [
  RouterOutlet,
  FormsModule,
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [materialModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class LoginComponent {
  user: string = '';
  password: string = '';
  loginValid: boolean = true;

  constructor() { }

  //constructor(private authService: AuthService, private router: Router) {

  //}

  //login(): void {
  //  this.authService.login(btoa(this.user), btoa(this.password)).subscribe({
  //    next: () => {
  //      this.loginValid = true;
  //      this.router.navigate(['index']);
  //    },
  //    error: (err: any) => this.loginValid = false
  //  });
  //}
}
