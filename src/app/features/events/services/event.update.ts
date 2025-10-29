import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG, UpdateEventRequest } from '@core/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventUpdate {
  private readonly http = inject(HttpClient);

  // Todo esto lo copie para tener referenciado el servicio desde otro servicio para simplemente cambiar donde sea
  // requerido event y agregar EventUpdate

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.base}`;
  }

  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  update(id: number, data: UpdateEventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, data);
  }

  constructor() {}
}
