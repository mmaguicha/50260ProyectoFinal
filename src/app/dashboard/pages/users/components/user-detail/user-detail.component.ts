import { Component } from '@angular/core';
import { User } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userDetail: User | undefined;

  constructor(
    private route: ActivatedRoute, private userService: UsersService
  ){
    
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (findedUser) => {
        //console.log(findedUser);     
        this.userDetail = findedUser;
      },
    });
  }
  
}