import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaterStatus } from '../../models/water-status/water-statu';

@Injectable({
  providedIn: 'root'
})
export class WaterStatusService {
  private baseUrl = 'https://json-api-nj61.onrender.com/waterStatus';

  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<WaterStatus[]> {
  return this.http.get<WaterStatus[]>(`${this.baseUrl}?userId=${userId}`);
}
}
