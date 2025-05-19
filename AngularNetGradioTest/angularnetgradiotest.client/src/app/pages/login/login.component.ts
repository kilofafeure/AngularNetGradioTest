import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterModule],
  standalone: true,
})

export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loginSubscription: Subscription | undefined;

  protected showErrorMessage: boolean = false;
  protected errorMessage: string = '';
  protected logged: boolean = false;
  protected clickedLogged: boolean = false;

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    this.imLogged(false);
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  imLogged(clicked: boolean) {
    this.logged = this.authService.isLoggedIn();
    this.clickedLogged = clicked;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showErrorMessage = false;
      this.loginSubscription = this.authService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            if (this.authService.isLoggedIn()) {
              this.router.navigate(['/weatherforecast']);
            }
            this.showError(response.errorMessage);
          },
          error: (err) => {
            console.error('login - onSubmit() error - Error fetching data:', err);
            this.showError('Unknown error');
          }
        });
    }
    else {
      this.showError('Invalid form');
    }
  }

  private showError(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorMessage = true;
  }
}
