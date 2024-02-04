import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../../dashboard/pages/courses/models';

let courses: Course[] = [
  {
    id: 1,
    name: 'Angular Fundamentals',
    description: 'Curso introductorio de Angular',
    duration: 20,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'React Basics',
    description: 'Introducción a React',
    duration: 15,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Vue.js Essentials',
    description: 'Curso esencial de Vue.js',
    duration: 18,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'Node.js for Beginners',
    description: 'Introducción a Node.js',
    duration: 25,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: 'Express.js Crash Course',
    description: 'Curso rápido de Express.js',
    duration: 12,
    createdAt: new Date(),
  },
]

@Injectable()

export class CoursesService {

  constructor() { }

  getCourses() {    
    return of(courses);
  }

  addCourse(newcourse: Course) {
    courses = [
      ...courses,
      {
        ...newcourse,
        id: this.getNextUniqueId(), //courses.length + 1,
      },
    ];
    return this.getCourses();
  }

  private getNextUniqueId(): number {
    // Encontramos el máximo ID actual
    const maxId = courses.length > 0 ? Math.max(...courses.map(e => e.id)) : 0;
    
    // Incrementamos el máximo ID para obtener un nuevo ID único
    return maxId + 1;
  }

  updateCourseById(courseId: number, updatecourse: Course) {
    courses = courses.map((course) => course.id === courseId ? { ...course, ...updatecourse } : course);
    return this.getCourses();
  }

  deleteCourseById(courseId: number) {
    courses = courses.filter((el) => el.id != courseId); // filtro y piso la variable
    return this.getCourses(); //llamo de nuevo a la funcion para q muestre la data actualizada
  }
  
  getCourseById(id: number | string): Observable<Course | undefined> {
    return of(courses.find((course) => course.id == id));
  }

}