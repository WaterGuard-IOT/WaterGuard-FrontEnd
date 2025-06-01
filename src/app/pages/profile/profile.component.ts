import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AuthService } from '../../shared/auth-service/auth.service';
import { UserService } from '../../data/services/users/user.service';
import { User } from '../../data/models/users/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const storedUsername = this.authService.getUser();
    if (storedUsername) {
      this.userService.getByUsername(storedUsername).subscribe({
        next: (user: User) => {
          this.username = user.username;
          this.email = user.email;
        },
        error: (err) => {
          console.error('Error al obtener el perfil del usuario', err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
