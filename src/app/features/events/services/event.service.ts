import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { Event, CreateEventRequest, UpdateEventRequest } from '../../../core/models';
import { ApiListResponse } from '../../../core/models';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private readonly http = inject(HttpClient);

    private get baseUrl(): string {
        return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.base}`;
    }

    getAll(): Observable<ApiListResponse<Event>> {
        return this.http.get<ApiListResponse<Event>>(this.baseUrl);
    }

    getById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.baseUrl}/${id}`);
    }

    create(data: CreateEventRequest): Observable<Event> {
        return this.http.post<Event>(this.baseUrl, data);
    }

    update(id: number, data: UpdateEventRequest): Observable<Event> {
        return this.http.put<Event>(`${this.baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
