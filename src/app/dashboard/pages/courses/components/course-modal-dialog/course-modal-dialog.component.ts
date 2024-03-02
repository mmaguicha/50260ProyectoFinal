import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-modal-dialog',
  templateUrl: './course-modal-dialog.component.html',
  styleUrl: './course-modal-dialog.component.scss'
})
export class CourseModalDialogComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseModalDialogComponent>,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public course?: Course
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required]],
      createdAt: ['', [Validators.required]],
      totalClasses: ['', [Validators.required]],
      nameTeacher: ['', [Validators.required]],
    });

    if (this.course) {
      this.courseForm.patchValue(this.course);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }

}