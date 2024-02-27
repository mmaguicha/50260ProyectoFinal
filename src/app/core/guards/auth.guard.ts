import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // console.log('AUTH GUARD');
  const router = inject(Router);
  
  const authService = inject(AuthService);
  
  return authService
    .verifyToken()
    .pipe(
      map((isAuthenticated) =>
        isAuthenticated ? true : router.createUrlTree(['auth', 'login']) //si es false la condicion, se tiene q volver a autenticar
      )
    );
  
};