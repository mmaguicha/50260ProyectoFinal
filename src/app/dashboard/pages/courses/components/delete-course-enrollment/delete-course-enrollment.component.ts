import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-course-enrollment',
  templateUrl: './delete-course-enrollment.component.html',
  styleUrl: './delete-course-enrollment.component.scss'
})
export class DeleteCourseEnrollmentComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCourseEnrollmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }
}