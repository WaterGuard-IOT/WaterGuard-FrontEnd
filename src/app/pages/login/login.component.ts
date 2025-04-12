
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common'; // Para *ngIf, etc. si lo usas

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule], // Aquí podrías incluir más módulos si los necesitas
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {}