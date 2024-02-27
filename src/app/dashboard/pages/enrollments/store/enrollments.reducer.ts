import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Student } from '../../students/models/student';
import { Course } from '../../courses/models';
import { Enrollment } from '../models';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];
  loading: boolean;
  loadingStudents: boolean;
  error: unknown;
}

export const initialState: State = {
  enrollments: [],
  students: [],
  courses: [],
  loading: false,
  loadingStudents: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, (state) => ({ ...state, loading: true })),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, action) => ({
    ...state,
    loading: false,
    enrollments: action.data,
  })),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(EnrollmentsActions.loadStudents, (state) => {
    return {
      ...state,
      loadingStudents: true,
    };
  }),
  on(EnrollmentsActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      loadingStudents: false,
      students: action.data,
    };
  }),
  on(EnrollmentsActions.loadCoursesSuccess, (state, action) => ({
    ...state,
    courses: action.data,
  }))
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});