import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('**************** authGuard - CanActivateFN');

  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    console.log('logged');
    return true;
  }
  console.log('not logged');
  const router = inject(Router);
  return router.parseUrl('/login');
};
