import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserModalDialogComponent } from './components/user-modal-dialog/user-modal-dialog.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

@NgModule({
  declarations: [
    UsersComponent,
    UserModalDialogComponent,
    DeleteUserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    RouterModule
  ],
  exports: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule { }