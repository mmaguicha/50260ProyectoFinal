import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollments from './enrollments.reducer';
import { DeleteEnrollmentComponent } from '../components/delete-enrollment/delete-enrollment.component';

export const selectEnrollmentsState = createFeatureSelector<fromEnrollments.State>(
  fromEnrollments.enrollmentsFeatureKey
);

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
);

export const selectEnrollmentsIsLoading = createSelector(
  selectEnrollmentsState,
  (state) => state.loading
);

export const selectEnrollmentsStudents = createSelector(
  selectEnrollmentsState,
  (state) => state.students
);

export const selectEnrollmentsCourses = createSelector(
  selectEnrollmentsState,
  (state) => state.courses
);

export const selectDeletedEnrollmentId = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
);