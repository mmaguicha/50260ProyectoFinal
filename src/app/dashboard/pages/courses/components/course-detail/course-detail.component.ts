import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { CoursesService } from '../../../../../core/services/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  courseDetail: Course | undefined;

  constructor(
    private route: ActivatedRoute, private courseService: CoursesService
  ){
    
    this.courseService.getCourseById(this.route.snapshot.params['id']).subscribe({
      next: (findedcourse) => {
        this.courseDetail = findedcourse;
      },
    });
  }
  
}