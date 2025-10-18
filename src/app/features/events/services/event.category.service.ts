import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG, ApiResponse, EventCategory } from '@core/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventCategoryService {
  private readonly http = inject(HttpClient);

  constructor() {}
  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.categories.getAll}`;
  }

  getAll(): Observable<ApiResponse<EventCategory[]>> {
    return this.http.get<ApiResponse<EventCategory[]>>(this.baseUrl);
  }
}
