import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { UserService } from '../../data/services/users/user.service'; 
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth-service/auth.service'; // Importa el AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ToolbarComponent, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = ''; 
  password = ''; 

  constructor(
    private userService: UserService,
    private authService: AuthService, // Inyecta el AuthService
    private router: Router
  ) {}

  login() {
    this.userService.getList().subscribe({
      next: (users) => {
        // Busca un usuario con el email y contraseña ingresados
        const user = users.find(u => u.email === this.email && u.password === this.password);
        if (user) {
          this.authService.setUser(user); // Almacena el usuario en localStorage
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']); // Redirige al home
        } else {
          alert('Correo o contraseña incorrectos');
        }
      },
      error: () => alert('Error al obtener la lista de usuarios')
    });
  }
}