import { Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'weatherforecast',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/weatherforecast/weatherforecast.component').then(c => c.WeatherForecastComponent)
  },
  {
    path: 'aiintegration',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/ai-integration/ai-integration.component').then(c => c.AIIntegrationComponent)
  },
  {
    path: "**",
    redirectTo: "/login"
  },
]
