import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  standalone: true,
})

export class LogoutComponent {
  authService = inject(AuthService);
  router = inject(Router);
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
