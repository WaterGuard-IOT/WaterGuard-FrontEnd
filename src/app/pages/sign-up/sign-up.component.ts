import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../data/services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, FormsModule], 
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name = '';
  lastName = '';
  typeUser = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
  
    this.userService.getList().subscribe({
      next: (users) => {
        const lastId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
        const newUser = {
          id: lastId + 1, 
          name: this.name,
          lastName: this.lastName,
          typeUser: this.typeUser,
          email: this.email,
          password: this.password
        };
  
        
        this.userService.createItem(newUser).subscribe({
          next: () => {
            alert('Usuario registrado correctamente');
            this.router.navigate(['/login']);
          },
          error: () => alert('Error al registrar usuario')
        });
      },
      error: () => alert('Error al obtener la lista de usuarios')
    });
  }
}
