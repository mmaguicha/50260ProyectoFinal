import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Student } from '../../dashboard/pages/students/models/student';
import { CreateEnrollData, Enrollment } from '../../dashboard/pages/enrollments/models';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  constructor(private http: HttpClient) {}

  getEnrollments() {
    return this.http.get<Enrollment[]>(`${environment.apiURL}/enrollments?_embed=user&_embed=product`);
  }

  getEnrollmentsById(studentId: string | number) {
    return this.http.get<Student>(`${environment.apiURL}/students/${studentId}`).pipe(
      concatMap((student) =>
        this.http.get(`${environment.apiURL}/enrollments?studentId=${student.id}`)
      ),
      catchError((error) => {
        alert('No se puede obtener la inscripción del estudiante');
        return throwError(() => error);
      })
    );
  }

  createEnrollment(data: CreateEnrollData) {
    return this.http.post<Enrollment>(`${environment.apiURL}/enrollments`, data);
  }
}