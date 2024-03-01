import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../core/services/students.service';
import { Student } from '../../models/student';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';
import { Enrollment } from '../../../enrollments/models';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Course } from '../../../courses/models';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  studentDetail: Student | undefined;
  enrollmentDetail: Enrollment | any;
  courseDetail: Course | undefined;
  mostrarCursos = false;

constructor(
  private route: ActivatedRoute, private studentService: StudentsService, 
  private enrollmentService: EnrollmentsService, private courseService: CoursesService
){  
  this.studentService.getStudentById(this.route.snapshot.params['id']).subscribe({
    next: (findedStudent) => {       
      this.studentDetail = findedStudent;
      this.loadStudentEnrollments(this.route.snapshot.params['id']);
    },
  });
}

toggleCourses(): void {
  this.mostrarCursos = !this.mostrarCursos;
}

private loadStudentEnrollments(studentId: string): void {
  this.enrollmentService.getEnrollmentsById(studentId).subscribe({
    next: (findedEnrollment) => {
      this.enrollmentDetail = findedEnrollment;
    },
    error: (error) => {
      alert('Error al cargar inscripciones.');
    }
  });
}

}