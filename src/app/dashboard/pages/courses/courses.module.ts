import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseModalDialogComponent } from './components/course-modal-dialog/course-modal-dialog.component';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { DeleteCourseEnrollmentComponent } from './components/delete-course-enrollment/delete-course-enrollment.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseModalDialogComponent,
    DeleteCourseComponent,
    CourseDetailComponent,
    DeleteCourseEnrollmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [CoursesComponent],
  providers: [CoursesService]
})
export class CoursesModule { }