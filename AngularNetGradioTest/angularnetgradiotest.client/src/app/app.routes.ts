import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './services/auth/auth.guard';
import { WeatherForecastX } from './pages/weatherforecast/weatherforecast.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  //{ path: 'weatherforecast', component: WeatherForecast, canActivate: [() => { alert('GUARD!'); return false; }] },
  {
   path: 'weatherforecast',
   canActivate: [() => { alert('GUARD!!'); return false; }],
   loadComponent: () => import('./pages/weatherforecast/weatherforecast.component').then(m => m.WeatherForecastX)
  },
  { path: "**", redirectTo: "/login" },
]

console.log(" *********************** RUTAS EN USO", routes);
