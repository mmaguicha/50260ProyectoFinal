import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-student-enrollment',
  templateUrl: './delete-student-enrollment.component.html',
  styleUrl: './delete-student-enrollment.component.scss'
})
export class DeleteStudentEnrollmentComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteStudentEnrollmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }
}