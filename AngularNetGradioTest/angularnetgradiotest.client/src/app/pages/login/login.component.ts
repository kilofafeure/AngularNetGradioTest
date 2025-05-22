import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { LoginResponseInt } from '../../model/interfaces/loginResponse.interface';

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

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.hideError();
      this.loginSubscription = this.authService.login(this.loginForm.value)
        .subscribe({
          next: (response: LoginResponseInt) => {
            if (response.errorId == null) {
              this.router.navigate(['/weatherforecast']);
            }
            this.showError(response.errorMessage);
          },
          error: (err) => {
            this.showError(err.message);
          }
        });
    }
    else {
      this.showError('Invalid form');
    }
  }

  private hideError() {
    this.errorMessage = '';
    this.showErrorMessage = false;
  }

  private showError(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorMessage = true;
  }
}
