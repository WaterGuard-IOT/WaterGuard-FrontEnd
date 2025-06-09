import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    private userService: UserService
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.userService.getByUsername(this.username).subscribe({
          next: (user) => {
            localStorage.setItem('userId', String(user.id));
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error al obtener usuario:', err);
            alert('No se pudo obtener el usuario');
          }
        });
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
