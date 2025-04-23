import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth-service/auth.service'; // Importa el AuthService

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  showIcons = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/login', '/signup', '/recover-password'];
      this.showIcons = !hiddenRoutes.includes(this.router.url);
    });
  }

  logout() {
    this.authService.logout(); 
  }
}