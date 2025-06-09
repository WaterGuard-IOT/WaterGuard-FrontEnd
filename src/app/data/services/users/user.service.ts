import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://172.178.70.242:8080/api/auth'; // ✅ antes era: '/api/auth'

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getByUsername(username: string): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers }).pipe(
      map(users => {
        const user = users.find(u => u.username === username);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
      })
    );
  }
}
