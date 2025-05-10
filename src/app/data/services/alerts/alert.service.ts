import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Alerts } from '../../models/alerts/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private baseUrl = 'http://localhost:3000/alerts';

  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<Alerts[]> {
  return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}`).pipe(
    map(response => response.length > 0 ? response[0].alertas : [])
  );
}

}
