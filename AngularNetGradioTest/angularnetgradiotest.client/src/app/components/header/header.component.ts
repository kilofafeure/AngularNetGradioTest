import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router"
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  menuItems = [
    { path: "/weatherforecast", label: "Weather F." },
  ]

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
