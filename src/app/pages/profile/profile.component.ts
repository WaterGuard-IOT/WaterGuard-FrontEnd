import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AuthService } from '../../shared/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  typeUser: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); 
    if (user) {
      this.name = user.name;
      this.lastName = user.lastName;
      this.email = user.email;
      this.typeUser = user.typeUser;
    }
  }

  logout(): void {
    this.authService.logout(); 
  }
}