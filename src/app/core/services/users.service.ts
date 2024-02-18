import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../dashboard/pages/users/models';

let users: User[] = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Gomez',
    email: 'juan.gomez@mail.com',
    password: '123',
    role: 'ADMIN',
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@mail.com',
    password: '1234',
    role: 'USER',
  },
  {
    id: 3,
    firstName: 'Lucas',
    lastName: 'Lopez',
    email: 'lucas.lopez@mail.com',
    password: '12345',
    role: 'ADMIN',
  },
];

@Injectable()

export class UsersService {

  constructor() { }

  getusers() {    
    return of(users);
  }

  addUser(newUser: User) {
    users = [
      ...users,
      {
        ...newUser,
        id: this.getNextUniqueId(), //users.length + 1,
      },
    ];
    return this.getusers();
  }

  private getNextUniqueId(): number {
    // Encontramos el máximo ID actual
    const maxId = users.length > 0 ? Math.max(...users.map(e => e.id)) : 0;
    
    // Incrementamos el máximo ID para obtener un nuevo ID único
    return maxId + 1;
  }

  updateUserById(UserId: number, updateUser: User) {
    users = users.map((User) => User.id === UserId ? { ...User, ...updateUser } : User);
    return this.getusers();
  }

  deleteUserById(UserId: number) {
    users = users.filter((el) => el.id != UserId); // filtro y piso la variable
    return this.getusers(); //llamo de nuevo a la funcion para q muestre la data actualizada
  }
  
  getUserById(id: number | string): Observable<User | undefined> {
    return of(users.find((User) => User.id == id));
  }

}