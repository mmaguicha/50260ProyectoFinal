import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // console.log('AUTH ADMIN');
    if (this.authService.authUser?.role === 'ADMIN') {
      return true;
    } else {
      alert('Usted no tiene permiso en esta sección. Lo llevaremos al Home');
      return this.router.createUrlTree(['dashboard', 'home']);
    }
  }
}
