import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);

  let logged = authService.isLoggedIn.pipe(
    take(1),
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        return false;
      }
      return true;
    })
  );

  if (logged) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/login');
};
