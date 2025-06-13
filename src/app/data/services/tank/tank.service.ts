import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tank } from '../../models/tank/tank.model';

@Injectable({
  providedIn: 'root',
})
export class TankService {
  private apiUrl = 'https://172.178.70.242/api'; 

  constructor(private http: HttpClient) {}

  /** Encabezado con token de sesión */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  /** Obtener todos los tanques de un usuario */
  getTanksByUser(userId: number): Observable<Tank[]> {
    return this.http.get<Tank[]>(`${this.apiUrl}/usuario/${userId}/tanques`, {
      headers: this.getHeaders(),
    });
  }

  /** Obtener un tanque específico por su ID */
  getTankById(tankId: number): Observable<Tank> {
    return this.http.get<Tank>(`${this.apiUrl}/tanque/${tankId}`, {
      headers: this.getHeaders(),
    });
  }

  /** Registrar datos de calidad de agua en un tanque */
  registerWaterQuality(tankId: number, data: any): Observable<Tank> {
    return this.http.post<Tank>(
      `${this.apiUrl}/tanque/${tankId}/calidad`,
      data,
      { headers: this.getHeaders() }
    );
  }

  /** Registrar nivel de agua en un tanque */
  registerWaterLevel(tankId: number, data: any): Observable<Tank> {
    return this.http.post<Tank>(
      `${this.apiUrl}/tanque/${tankId}/nivel`,
      data,
      { headers: this.getHeaders() }
    );
  }
}
