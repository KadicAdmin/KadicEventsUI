import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG, ApiResponse, EventTags } from '@core/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventTagsService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.eventTags.base}`;
  }

  getAll(): Observable<ApiResponse<EventTags[]>> {
    return this.http.get<ApiResponse<EventTags[]>>(`${this.baseUrl}`);
  }

  constructor() {}
}
