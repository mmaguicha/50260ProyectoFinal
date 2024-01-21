import { Component, Input } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})
export class StudentTableComponent {

  @Input()
  dataSource: Student[] = [];

  displayedColumns = ['id', 'fullname', 'email', 'actions'];
  
}