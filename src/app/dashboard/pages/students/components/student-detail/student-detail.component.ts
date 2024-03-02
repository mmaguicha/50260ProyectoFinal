import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../core/services/students.service';
import { Student } from '../../models/student';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';
import { Enrollment } from '../../../enrollments/models';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Course } from '../../../courses/models';
import { EnrollmentsActions } from '../../../enrollments/store/enrollments.actions';
import { DeleteStudentEnrollmentComponent } from '../delete-student-enrollment/delete-student-enrollment.component';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  studentDetail: Student | undefined;
  enrollmentDetail: Enrollment | any;  
  mostrarCursos = false;

constructor(
  private route: ActivatedRoute, private studentService: StudentsService, 
  private enrollmentService: EnrollmentsService, private store: Store, 
  private matDialog: MatDialog
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
  this.enrollmentService.getEnrollmentsByStudentId(studentId).subscribe({
    next: (findedEnrollment) => {
      this.enrollmentDetail = findedEnrollment;
    },
    error: () => {
      alert('Error al cargar inscripciones.');
    }
  });
}

onDeleteEnrollment(enrollmentId: string ): void {    
  const dialogRef = this.matDialog.open(DeleteStudentEnrollmentComponent);
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.store.dispatch(EnrollmentsActions.deleteEnrollment({ id: enrollmentId }));
      this.loadStudentEnrollments(this.route.snapshot.params['id']);
   }
  });
}  

}