import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://172.178.70.242/api/auth';
  private readonly tokenKey = 'token';
  private readonly currentUserKey = 'currentUser';
  private readonly userIdKey = 'userId';

  constructor(private http: HttpClient, private router: Router) {}

  
  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
    tap(response => {
      localStorage.setItem('token', response.token); 
      localStorage.setItem('currentUser', username);
    })
  );
}


  
  register(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload, { responseType: 'text' });
  }

  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }

  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  getUser(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }

  
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }
}
