import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { User } from '../dashboard/pages/users/models';
import { AuthService } from '../core/services/auth.service';

describe('Pruebas en AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('AuthService debe estar definido', () => {
    expect(authService).toBeTruthy();
  });

  it('Al llamar al metodo login() debe establecer un authUser', () => {
    const MOCK_RESPONSE: User[] = [
      {
        id: 23,
        firstName: 'MOCKFIRSTNAME',
        lastName: 'MOCKLASTNAME',
        email: 'mock@mail.com',
        password: 'password',
        role: 'ADMIN',
        token: 'erfrtvlkidjag',
      },
    ];

    // Llamamos al login
    authService
      .login({ email: 'mock@mail.com', password: 'password' })
      .subscribe({
        next: () => {
          // Verificamos que el login establezca correctamente el usuario
          expect(authService.authUser).toEqual(MOCK_RESPONSE[0]);
        },
      });

    // Sobre escribimos la request por una request falsa
    httpController
      .expectOne({
        url: 'http://localhost:3000/users?email=mock@mail.com&password=password',
        method: 'GET',
      })
      .flush(MOCK_RESPONSE);
  });

  it('Al llamar al método getAuthenticatedUserWithRole(), debe devolver el usuario autenticado y su rol', () => {
    // Simular usuario autenticado
    authService.authUser = {
      id: 1,
      firstName: 'Usuario',
      lastName: 'Test',
      email: 'test@example.com',
      password: 'password',
      role: 'USER',
      token: 'abcdef123456',
    };
  
    // Llamar al método getAuthenticatedUserWithRole()
    authService.getAuthenticatedUserWithRole().subscribe((userWithRole) => {
      // Verificar que se devuelva correctamente el usuario autenticado y su rol
      expect(userWithRole).toEqual({ user: authService.authUser, role: authService.authUser?.role ?? null});
    });
  });
  
});