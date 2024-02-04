import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.scss'
})

export class DeleteCourseComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

}