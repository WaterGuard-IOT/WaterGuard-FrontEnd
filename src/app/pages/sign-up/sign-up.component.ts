import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
      return;
    }

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackBar.open('Hubo un error al registrarse', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
