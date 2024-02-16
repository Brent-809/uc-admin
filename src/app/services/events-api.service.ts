import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Events } from '../shared/interfaces/events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`${this.baseUrl}/events`);
  }

  getEventById(id: string | null): Observable<Events[]> {
    return this.http.get<Events[]>(`${this.baseUrl}/events/${id}`);
  }

  createEvent(eventData: Events[]): Observable<Events[]> {
    return this.http.post<Events[]>(`${this.baseUrl}/events`, eventData);
  }
}
