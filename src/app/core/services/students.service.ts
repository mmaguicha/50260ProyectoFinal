import { Injectable } from '@angular/core';
import { Student } from '../../dashboard/pages/students/models/student';
import { Observable, of } from 'rxjs';

let students: Student[] = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Gomez',
    email: 'juan.gomez@mail.com',
    document: 36523122,
    birthDate: new Date(1991, 2, 12)
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@mail.com',
    document: 36535122,
    birthDate: new Date(1993, 5, 12)
  },
  {
    id: 3,
    firstName: 'Lucas',
    lastName: 'Lopez',
    email: 'lucas.lopez@mail.com',
    document: 32323122,
    birthDate: new Date(1995, 2, 2)
  },
  {
    id: 4,
    firstName: 'Ana',
    lastName: 'Fernandez',
    email: 'ana.fernandez@mail.com',
    document: 36523422,
    birthDate: new Date(1990, 5, 11)
  },
  {
    id: 5,
    firstName: 'Diego',
    lastName: 'Diaz',
    email: 'diego.diaz@mail.com',
    document: 36523100,
    birthDate: new Date(1990, 10, 10)
  }
];

@Injectable()

export class StudentsService {

  constructor() { }

  getStudents() {    
    return of(students);
  }

  addStudent(newStudent: Student) {
    students = [
      ...students,
      {
        ...newStudent,
        id: this.getNextUniqueId(), //students.length + 1,
      },
    ];
    return this.getStudents();
  }

  private getNextUniqueId(): number {
    // Encontramos el máximo ID actual
    const maxId = students.length > 0 ? Math.max(...students.map(e => e.id)) : 0;
    
    // Incrementamos el máximo ID para obtener un nuevo ID único
    return maxId + 1;
  }

  updateStudentById(studentId: number, updateStudent: Student) {
    students = students.map((student) => student.id === studentId ? { ...student, ...updateStudent } : student);
    return this.getStudents();
  }

  deleteStudentById(StudentId: number) {
    students = students.filter((el) => el.id != StudentId); // filtro y piso la variable
    return this.getStudents(); //llamo de nuevo a la funcion para q muestre la data actualizada
  }
  
  getStudentById(id: number | string): Observable<Student | undefined> {
    return of(students.find((student) => student.id == id));
  }

}