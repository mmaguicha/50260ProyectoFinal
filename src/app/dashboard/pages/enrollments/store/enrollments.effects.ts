import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { StudentsService } from '../../../../core/services/students.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class EnrollmentsEffects {

  loadEnrollmentss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollments),
      concatMap(() =>
      this.enrollmentsService.getEnrollments().pipe(
          map(data => EnrollmentsActions.loadEnrollmentsSuccess({ data })),
          catchError(error => of(EnrollmentsActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map((resp) => EnrollmentsActions.loadStudentsSuccess({ data: resp })),
          catchError((error) => {
            return of(EnrollmentsActions.loadStudentsFailure({ error }));
          })
        )
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadCourses),
      concatMap(() => {
        return this.coursesService.getCourses().pipe(
          map((resp) => EnrollmentsActions.loadCoursesSuccess({ data: resp })),
          catchError((error) => of(EnrollmentsActions.loadCoursesFailure({ error })))
        );
      })
    );
  });

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollment),
      concatMap((action) => {
        return this.enrollmentsService.createEnrollment(action.data).pipe(
          map((resp) => EnrollmentsActions.createEnrollmentSuccess({ data: resp })),
          catchError((error) => of(EnrollmentsActions.createEnrollmentFailure({ error })))
        );
      })
    );
  });

  createEnrollmentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollmentSuccess),
      map(() => EnrollmentsActions.loadEnrollments())
    );
  });

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.deleteEnrollment), // Listen for the delete action
      concatMap((action) => {
        return this.enrollmentsService.deleteEnrollmentById(action.id).pipe(
          map(() => EnrollmentsActions.deleteEnrollmentSuccess({ id: action.id })), // Dispatch success action
          catchError((error) => of(EnrollmentsActions.deleteEnrollmentFailure({ error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService
    ) {}
}
