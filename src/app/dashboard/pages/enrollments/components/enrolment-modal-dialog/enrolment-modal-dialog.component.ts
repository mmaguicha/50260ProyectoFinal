import { Component } from '@angular/core';
import { Student } from '../../../students/models/student';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { EnrollmentsActions } from '../../store/enrollments.actions';
import { selectEnrollmentsStudents, selectEnrollmentsCourses } from '../../store/enrollments.selectors';

@Component({
  selector: 'app-enrolment-modal-dialog',
  templateUrl: './enrolment-modal-dialog.component.html',
  styleUrl: './enrolment-modal-dialog.component.scss'
})
export class EnrolmentModalDialogComponent {
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  enrollmentForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EnrolmentModalDialogComponent>
  ) {
    this.enrollmentForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
    });

    this.store.dispatch(EnrollmentsActions.loadStudents());
    this.store.dispatch(EnrollmentsActions.loadCourses());

    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        EnrollmentsActions.createEnrollment({ data: this.enrollmentForm.value })
      );
      this.matDialogRef.close();
    }
  }
}