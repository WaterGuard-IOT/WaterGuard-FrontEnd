import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; // Usamos proxy
  private readonly tokenKey = 'token';
  private readonly currentUserKey = 'currentUser';
  private readonly userIdKey = 'userId';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔹 Login con almacenamiento del token y username
  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
    tap(response => {
      localStorage.setItem('token', response.token); // ✅ importante
      localStorage.setItem('currentUser', username);
    })
  );
}


  // 🔹 Registro de nuevo usuario
  register(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload, { responseType: 'text' });
  }

  // 🔹 Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }

  // 🔹 Verifica autenticación
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // 🔹 Obtiene token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 🔹 Obtiene username
  getUser(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }

  // 🔹 (Opcional) Obtiene userId
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }
}
