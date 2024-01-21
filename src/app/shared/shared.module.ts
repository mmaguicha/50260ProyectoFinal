import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormErrorsPipe } from './pipes/form-errors.pipe';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitulosDirective } from './directives/titulos.directive';
import { CurrentYearDirective } from './directives/current-year.directive';

@NgModule({
  declarations: [
    FormErrorsPipe,
    FullNamePipe,
    TitulosDirective,
    CurrentYearDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    FormErrorsPipe,
    FullNamePipe,
    TitulosDirective,
    CurrentYearDirective,
  ],
})
export class SharedModule { }