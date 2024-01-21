import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentModalDialogComponent } from './components/student-modal-dialog/student-modal-dialog.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentModalDialogComponent,
    StudentTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [StudentsComponent],
})
export class StudentsModule { }