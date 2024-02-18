import { Injectable } from '@angular/core';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { User } from '../../dashboard/pages/users/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

// let users: User[] = [
//   {
//     id: 1,
//     firstName: 'Juan',
//     lastName: 'Gomez',
//     email: 'juan.gomez@mail.com',
//     password: '123',
//     role: 'ADMIN',
//     token: 'qw1'
//   },
//   {
//     id: 2,
//     firstName: 'Maria',
//     lastName: 'Rodriguez',
//     email: 'maria.rodriguez@mail.com',
//     password: '1234',
//     role: 'USER',
//     token: 'qw2'
//   },
//   {
//     id: 3,
//     firstName: 'Lucas',
//     lastName: 'Lopez',
//     email: 'lucas.lopez@mail.com',
//     password: '12345',
//     role: 'ADMIN',
//     token: 'qw3'
//   },
// ];

@Injectable({providedIn: 'root'})

export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {    
    //return of(users);

    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users`, {  })
      .pipe(
        catchError((error) => {
          alert('Error al cargar los usuarios');
          return of([]);
        })
      );
  }

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  addUser(newUser: User) {
    // users = [
    //   ...users,
    //   {
    //     ...newUser,
    //     id: this.getNextUniqueId(), //users.length + 1,
    //   },
    // ];
    // return this.getusers();

    return this.httpClient
    .post<User>(`${environment.apiURL}/users`, {
      ...newUser,
      token: this.generateString(15),
    })
      .pipe(mergeMap(() => this.getUsers()));
  }


  // private getNextUniqueId(): number {
  //   // Encontramos el máximo ID actual
  //   const maxId = users.length > 0 ? Math.max(...users.map(e => e.id)) : 0;
    
  //   // Incrementamos el máximo ID para obtener un nuevo ID único
  //   return maxId + 1;
  // }


  updateUserById(UserId: number, updateUser: User) {
    // users = users.map((User) => User.id === UserId ? { ...User, ...updateUser } : User);
    // return this.getusers();
    
    console.log(updateUser);
    return this.httpClient.put<User>(`${environment.apiURL}/users/${UserId}`, { ...updateUser,
      token: updateUser.token })
      .pipe(mergeMap(() => this.getUsers()));
  }

  deleteUserById(UserId: number) {
    // users = users.filter((el) => el.id != UserId); // filtro y piso la variable
    // return this.getusers(); //llamo de nuevo a la funcion para q muestre la data actualizada

    return this.httpClient.delete<User>(`${environment.apiURL}/users/${UserId}`)
      .pipe(mergeMap(() => this.getUsers()));
  }
  
  getUserById(id: number | string): Observable<User | undefined> {
    //return of(users.find((User) => User.id == id));
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`);
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB);
  }

}