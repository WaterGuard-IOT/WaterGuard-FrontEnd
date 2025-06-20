import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alert } from '../../models/alert/alert.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = 'https://172.178.70.242/api/alertas';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getAlertById(id: number): Observable<Alert> {
    return this.http.get<Alert>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getAlertsByTank(tankId: string): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/tanque/${tankId}`, { headers: this.getAuthHeaders() });
  }

  createAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(this.apiUrl, alert, { headers: this.getAuthHeaders() });
  }

  updateAlert(id: number, alert: Alert): Observable<Alert> {
    return this.http.put<Alert>(`${this.apiUrl}/${id}`, alert, { headers: this.getAuthHeaders() });
  }

  deleteAlert(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  resolveAlert(alert: Alert): Observable<Alert> {
  const updatedAlert = { ...alert, resolved: true };
  return this.http.put<Alert>(
    `${this.apiUrl}/${alert.id}`,
    updatedAlert,
    { headers: this.getAuthHeaders() }
  );
}

}
