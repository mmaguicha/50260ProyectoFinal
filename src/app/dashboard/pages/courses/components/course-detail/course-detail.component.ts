import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Enrollment } from '../../../enrollments/models';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCourseEnrollmentComponent } from '../delete-course-enrollment/delete-course-enrollment.component';
import { EnrollmentsActions } from '../../../enrollments/store/enrollments.actions';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  courseDetail: Course | undefined;
  enrollmentDetail: Enrollment | any;  
  mostrarAlumnos = false;
  
  constructor(
    private route: ActivatedRoute, private courseService: CoursesService,
    private enrollmentService: EnrollmentsService, private store: Store, 
    private matDialog: MatDialog
  ){
    
    this.courseService.getCourseById(this.route.snapshot.params['id']).subscribe({
      next: (findedcourse) => {
        this.courseDetail = findedcourse;
        this.loadCourseEnrollments(this.route.snapshot.params['id']);
      },
    });
  }

  toggleStudents(): void {
    this.mostrarAlumnos = !this.mostrarAlumnos;
  }

  private loadCourseEnrollments(courseId: string): void {
    this.enrollmentService.getEnrollmentsByCourseId(courseId).subscribe({
      next: (findedEnrollment) => {
        this.enrollmentDetail = findedEnrollment;
      },
      error: () => {
        alert('Error al cargar inscripciones.');
      }
    });
  }
  
  onDeleteEnrollment(enrollmentId: string ): void {    
    const dialogRef = this.matDialog.open(DeleteCourseEnrollmentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(EnrollmentsActions.deleteEnrollment({ id: enrollmentId }));
        this.loadCourseEnrollments(this.route.snapshot.params['id']);
     }
    });
  }
  
}