import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { EventCategory } from '@core/models/event.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventCategoryService {
  private readonly http = inject(HttpClient)

  constructor() {
    console.log('Get All Event Categories:', this.getAll());
  }

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.eventCategories.base}/Categories`;
  }

  getAll(): Observable<EventCategory[]> {
    return this.http.get<EventCategory[]>(`${this.baseUrl}/GetAll`);
  }
}
