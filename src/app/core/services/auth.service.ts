import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, delay, finalize, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../dashboard/pages/users/models';
import { environment } from '../../../environments/environment.development';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: User | null = null;

    constructor(
        private router: Router,
        private httpClient: HttpClient
  ) {}

  private setAuthUser(user: User): void {
    this.authUser = user;
    localStorage.setItem('token', user.token);
  }

  login(data: LoginData): Observable<User[]> {
    return this.httpClient
      .get<User[]>(
        `${environment.apiURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        // la funcion tap siempre se ejecuta cuando la petición está OK
        tap((response) => {
          if (!!response[0]) {
            this.setAuthUser(response[0]);
            this.router.navigate(['dashboard', 'home']);
          } else {
            alert('Email o password invalidos');
          }
        })
      );
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token'); //  si o si remover el token del browser
  }

  verifyToken() { //Siempre se llama a este metodo para comprobar el usuario autenticado
    // esto es para mantener la sesion activa del usuario logueado

    return this.httpClient
      .get<User[]>(
        `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.authUser = null;
            localStorage.removeItem('token'); //elimino el local storage
            return false;
          }
        }),
        catchError(() => of(false))
      );
  }
  
   // Método para obtener el usuario autenticado con su rol
   getAuthenticatedUserWithRole(): Observable<{ user: User | null, role: string | null }> {
    return of({ user: this.authUser, role: this.authUser?.role || null });
  }
}