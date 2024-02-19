import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../pages/users/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output()
  toggleSidebar = new EventEmitter();
  authenticatedUser: { user: User | null, role: string | null } = { user: null, role: null };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedUserWithRole().subscribe(userWithRole => {
      this.authenticatedUser = userWithRole;
    });
  }
}