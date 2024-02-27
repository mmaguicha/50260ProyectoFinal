import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-enrollment',
  templateUrl: './delete-enrollment.component.html',
  styleUrl: './delete-enrollment.component.scss'
})
export class DeleteEnrollmentComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteEnrollmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }
  
}