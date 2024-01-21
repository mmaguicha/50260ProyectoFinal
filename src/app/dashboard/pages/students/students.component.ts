import { Component } from '@angular/core';
import { Student } from './models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentModalDialogComponent } from './components/student-modal-dialog/student-modal-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  students: Student[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Gomez',
      email: 'juan.gomez@mail.com',
    },
    {
      id: 2,
      firstName: 'Maria',
      lastName: 'Rodriguez',
      email: 'maria.rodriguez@mail.com',
    },
    {
      id: 3,
      firstName: 'Lucas',
      lastName: 'Lopez',
      email: 'lucas.lopez@mail.com',
    },
    {
      id: 4,
      firstName: 'Ana',
      lastName: 'Fernandez',
      email: 'ana.fernandez@mail.com',
    },
    {
      id: 5,
      firstName: 'Diego',
      lastName: 'Diaz',
      email: 'diego.diaz@mail.com',
    }
  ];

  displayedColumns = ['id', 'fullname', 'email', 'actions'];
  
  constructor(private matDialog: MatDialog) {}

  openStudentsDialog(): void {
    this.matDialog.open(StudentModalDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.addStudent(result);
        }
      });      
  }

  private addStudent(newStudent: Student): void {
    this.students = [
      ...this.students,
      {
        ...newStudent,
        id: this.getNextUniqueId(), //this.students.length + 1,
      },
    ];
  }

  private getNextUniqueId(): number {
    // Encontramos el máximo ID actual
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(e => e.id)) : 0;
    
    // Incrementamos el máximo ID para obtener un nuevo ID único
    return maxId + 1;
  }

  onEditStudent(student: Student): void {
    const dialogRef = this.matDialog.open(StudentModalDialogComponent, {
      data: student,
    });

    dialogRef.afterClosed().subscribe((updatedStudent) => {
      if (updatedStudent) {
        this.updateStudent(student.id, updatedStudent);
      }
    });
  }

  private updateStudent(studentId: number, updatedStudent: Student): void {
    this.students = this.students.map((student) =>
      student.id === studentId ? { ...student, ...updatedStudent } : student
    );
  }
  
  onDeleteStudent(studentId: number): void {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((u) => u.id !== studentId);
    }
  }

}