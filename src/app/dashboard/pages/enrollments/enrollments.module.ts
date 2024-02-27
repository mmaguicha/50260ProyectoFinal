import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentsEffects } from './store/enrollments.effects';
import { EnrolmentModalDialogComponent } from './components/enrolment-modal-dialog/enrolment-modal-dialog.component';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { enrollmentsFeature } from './store/enrollments.reducer';
import { CoursesService } from '../../../core/services/courses.service';
import { DeleteEnrollmentComponent } from './components/delete-enrollment/delete-enrollment.component';

@NgModule({
  declarations: [EnrollmentsComponent, EnrolmentModalDialogComponent, DeleteEnrollmentComponent],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([EnrollmentsEffects])
  ],
  providers: [CoursesService],
})
export class EnrollmentsModule { }