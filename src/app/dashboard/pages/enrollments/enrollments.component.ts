import { Component, OnDestroy } from '@angular/core';
import { Enrollment } from './models';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { selectEnrollments } from './store/enrollments.selectors';
import { EnrollmentsActions } from './store/enrollments.actions';
import { EnrolmentModalDialogComponent } from './components/enrolment-modal-dialog/enrolment-modal-dialog.component';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnDestroy {

  enrollments: Enrollment[] = [];

  enrollmentsSubscripion?: Subscription;

  destroyed$ = new Subject();

  constructor(private store: Store, private matDialog: MatDialog) {

    this.store
      .select(selectEnrollments)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (enrollments) => {
          this.enrollments = enrollments;
        },
      });

    this.store.dispatch(EnrollmentsActions.loadEnrollments());
  }
  
  createEnrollment(): void {
    this.matDialog.open(EnrolmentModalDialogComponent);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}