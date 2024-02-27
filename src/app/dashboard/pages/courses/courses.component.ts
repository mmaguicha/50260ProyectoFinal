import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Course } from './models';
import { CoursesService } from '../../../core/services/courses.service';
import { CourseModalDialogComponent } from './components/course-modal-dialog/course-modal-dialog.component';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses : Course[] = [];

  displayedColumns = ['id', 'name', 'description', 'duration', 'createdAt', 'actions'];
  
  constructor(private matDialog: MatDialog, private coursesService: CoursesService, private route: ActivatedRoute) {
    //console.log(this.route.snapshot.queryParams); 
    
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  openCoursesDialog(): void {
    this.matDialog.open(CourseModalDialogComponent)
      .afterClosed()
      .subscribe({ //me suscribo a la data enviada del Dialog Component
        next: (result) => {
          if (result) {
            this.coursesService.addCourse(result).subscribe({
              next: (courses) => (this.courses = courses),
            });
          }
        },
      });    
  }

  onEditcourse(course: Course): void {
    const dialogRef = this.matDialog.open(CourseModalDialogComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((updatedcourse) => {
      if (updatedcourse) {
        this.coursesService
              .updateCourseById(course.id, updatedcourse)
              .subscribe({
                next: (courses) => (this.courses = courses),
              });
      }
    });
  }

  onDeletecourse(courseId: number): void {    

    const dialogRef = this.matDialog.open(DeleteCourseComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.coursesService.deleteCourseById(courseId).subscribe({
          next: (courses) => {
            this.courses = courses;
          },
        });      }
    });
  }  

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

}