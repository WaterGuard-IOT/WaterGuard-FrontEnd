import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trends } from '../../models/trends/trend';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
  private baseUrl = 'https://json-api-nj61.onrender.com/trends';

  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<Trends[]> {
  return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}`).pipe(
    map(response => response.length > 0 ? response[0].datos : [])
  );
}
}
