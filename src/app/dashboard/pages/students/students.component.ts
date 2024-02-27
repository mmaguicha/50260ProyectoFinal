import { Component } from '@angular/core';
import { Student } from './models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentModalDialogComponent } from './components/student-modal-dialog/student-modal-dialog.component';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { StudentsService } from '../../../core/services/students.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../users/models';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  students : Student[] = [];

  displayedColumns = ['id', 'fullname', 'email', 'document', 'birthdate', 'actions'];
  
  authenticatedUser: { user: User | null, role: string | null } = { user: null, role: null };
  
  constructor(
    private matDialog: MatDialog, private studentsService: StudentsService, 
    private route: ActivatedRoute, private authService: AuthService) {
    //console.log(this.route.snapshot.queryParams); 
    
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });

    this.authService.getAuthenticatedUserWithRole().subscribe(userWithRole => {
      this.authenticatedUser = userWithRole;
    });
  }

  openStudentsDialog(): void {
    this.matDialog.open(StudentModalDialogComponent)
      .afterClosed()
      .subscribe({ //me suscribo a la data enviada del Dialog Component
        next: (result) => {
          if (result) {
            this.studentsService.addStudent(result).subscribe({
              next: (students) => (this.students = students),
            });
          }
        },
      });    
  }  

  onEditStudent(student: Student): void {
    const dialogRef = this.matDialog.open(StudentModalDialogComponent, {
      data: student,
    });

    dialogRef.afterClosed().subscribe((updatedStudent) => {
      if (updatedStudent) {
        this.studentsService
              .updateStudentById(student.id, updatedStudent)
              .subscribe({
                next: (students) => (this.students = students),
              });
      }
    });
  }
 
  onDeleteStudent(studentId: number): void {
    // if (confirm('Esta seguro que desea eliminar al estudiante?')) {
    //   this.students = this.students.filter((u) => u.id !== studentId);
    // }

    const dialogRef = this.matDialog.open(DeleteStudentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentsService.deleteStudentById(studentId).subscribe({
          next: (students) => {
            this.students = students;
          },
        });      }
    });
  }  

  formatBirthDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

}