import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentModalDialogComponent } from './components/student-modal-dialog/student-modal-dialog.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { SharedModule } from '../../../shared/shared.module';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { StudentsService } from '../../../core/services/students.service';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentModalDialogComponent,
    StudentTableComponent,
    DeleteStudentComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [StudentsComponent],
  providers: [StudentsService]
})
export class StudentsModule { }