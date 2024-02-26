import { Component } from '@angular/core';
import { User } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserModalDialogComponent } from './components/user-modal-dialog/user-modal-dialog.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users : User[] = [];

  displayedColumns = ['id', 'fullName', 'email', 'role', 'actions'];
  
  constructor(private matDialog: MatDialog, private usersService: UsersService, private route: ActivatedRoute) {
    console.log(this.route.snapshot.queryParams); 
    
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  openUsersDialog(): void {
    this.matDialog.open(UserModalDialogComponent)
      .afterClosed()
      .subscribe({ //me suscribo a la data enviada del Dialog Component
        next: (result) => {
          if (result) {
            this.usersService.addUser(result).subscribe({
              next: (users) => (this.users = users),
            });
          }
        },
      });    
  }  

  onEditUser(user: User): void {
    const dialogRef = this.matDialog.open(UserModalDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((updateduser) => {
      Object.assign(updateduser, {id:user.id, token: user.token});
      if (updateduser) {
        this.usersService
              .updateUserById(user.id, updateduser)
              .subscribe({
                next: (users) => (this.users = users),
              });
      }
    });
  }
 
  onDeleteUser(userId: number): void {    
    const dialogRef = this.matDialog.open(DeleteUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.deleteUserById(userId).subscribe({
          next: (users) => {
            this.users = users;
          },
        });      }
    });
  }    

}