import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../../core/services/students.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  studentDetail: Student | undefined;

constructor(
  private route: ActivatedRoute, private studentService: StudentsService
){
  
  this.studentService.getStudentById(this.route.snapshot.params['id']).subscribe({
    next: (findedStudent) => {
      //console.log(findedStudent);     
      this.studentDetail = findedStudent;
    },
  });
}

}