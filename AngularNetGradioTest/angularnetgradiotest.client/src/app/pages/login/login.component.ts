import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
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
            else {
              this.errorMessage = response.errorMessage;
              this.showErrorMessage = true;
            }
          },
          error: (err) => {
            console.error('login - onSubmit() error - Error fetching data:', err);
          }
        });
    }
    else {
      this.errorMessage = 'Invalid form';
      this.showErrorMessage = true;
    }
  }
}
