import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth-service/auth.service';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { UserService } from '../../data/services/users/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToolbarComponent, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.userService.getByUsername(this.username).subscribe({
          next: (user) => {
            localStorage.setItem('userId', String(user.id));
            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/home']);
          },
          error: () => {
            this.snackBar.open('No se pudo obtener el usuario', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
