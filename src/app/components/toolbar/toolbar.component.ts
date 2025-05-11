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
    this.router.events.subscribe((event: any) => {
  const hiddenRoutes = ['/login', '/signup', '/recover-password'];
  const currentRoute = this.router.url || event.url || '';
  this.showIcons = !hiddenRoutes.includes(currentRoute);
});

  }

  logout() {
    this.authService.logout(); 
  }
}