import { Component } from '@angular/core';
import { Enrollment } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';

@Component({
  selector: 'app-enrolment-detail',
  templateUrl: './enrolment-detail.component.html',
  styleUrl: './enrolment-detail.component.scss'
})
export class EnrolmentDetailComponent {
  enrollmentDetail: Enrollment | undefined;

  constructor(
    private route: ActivatedRoute, private enrollmentService: EnrollmentsService
  ){
    
    this.enrollmentService.getEnrollmentById(this.route.snapshot.params['id']).subscribe({
      next: (findedEnroll) => {
        this.enrollmentDetail = findedEnroll;
        
      },
    });
  }
}