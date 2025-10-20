import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { Event, UpdateEventRequest } from '../../../core/models';
import { EventRequestDto, EventResp } from '../models/events.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.base}`;
  }


  getAll(): Observable<any> {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.getAll}/`;
    return this.http.get<any>(url);
  }


  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }


  create(eventData: any): Observable<EventResp> {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.create}`;
    return this.http.post<EventResp>(url, eventData);
  }

  update(id: number, data: UpdateEventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
