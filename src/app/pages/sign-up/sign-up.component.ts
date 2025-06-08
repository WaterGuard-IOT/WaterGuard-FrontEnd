import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/auth-service/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        console.log('Respuesta:', response); // Para ver qué devuelve
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Hubo un error al registrarse');
      }
    });
  }
}
