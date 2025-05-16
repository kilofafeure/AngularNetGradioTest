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
  authService = inject(AuthService);
  router = inject(Router);
  private loginSubscription: Subscription | undefined;

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
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('login - onSubmit(): ', response);
            if (this.authService.isLoggedIn()) {
              this.router.navigate(['/weatherforecast']);
            }
          },
          error: (err) => {
            console.error('login - onSubmit() error - Error fetching data:', err);
          }
        });
        //.subscribe((data: any) => {
        //  if (this.authService.isLoggedIn()) {
        //    this.router.navigate(['/admin']);
        //  }
        //  console.log(data);
        //});
    }
  }
}


//import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
//import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth/auth.service';
//import { Subscription } from 'rxjs';


//@Component({
//  selector: 'app-login',
//  standalone: true,
//  imports: [],
//  templateUrl: './login.component.html',
//  styleUrl: './login.component.css',
//  changeDetection: ChangeDetectionStrategy.OnPush
//})

//export class LoginComponent implements OnDestroy {
//  username: string = '';
//  password: string = '';
//  loginValid: boolean = true;
//  private loginSubscription: Subscription | undefined;

//  constructor(private authservice: AuthService, private router: Router) {}

//  ngOnDestroy() {
//    if (this.loginSubscription) {
//      this.loginSubscription.unsubscribe();
//    }
//  }

//  login(): void {
//    // TODO CORRECT CALL API
//    this.loginSubscription = this.authservice.login(this.username, this.password).subscribe({
//      next: (response) => {
//        this.loginValid = response;
//        if (response)
//          this.router.navigate(['weatherforecast']);
//      },
//      error: (err: any) => {
//        this.loginValid = false;
//        // TODO - NOT DELETE< MEANWHILE NOT CORRECT CALL API
//        if (this.username == 'admin' && this.password == 'admin')
//          this.loginValid = true;
//        return this.loginValid;
//      }
//    })
//  }
//}
