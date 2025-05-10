import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../../data/models/users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserKey = 'currentUser'; 

  constructor(private router: Router) {}

  
  setUser(user: Users): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    localStorage.setItem('userId', String(user.id)); // ← ESTA LÍNEA ES CLAVE
  }

  /** Obtiene el usuario desde localStorage */
  getUser(): Users | null {
    try {
      const userJson = localStorage.getItem(this.currentUserKey);
      return userJson ? JSON.parse(userJson) as Users : null;
    } catch (error) {
      console.error('Error al obtener el usuario de localStorage:', error);
      return null;
    }
  }

  
  logout(): void {
    this.clearUser();
    this.router.navigate(['/login']);
  }

 
  private clearUser(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  
  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }
}