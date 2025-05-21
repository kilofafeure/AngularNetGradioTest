import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router"
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  menuItems = [
    { path: "/weatherforecast", label: "Weather F." },
    { path: "/aiintegration", label: "AI Integration" },
  ]

  protected logged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
