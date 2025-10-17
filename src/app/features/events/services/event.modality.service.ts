import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { ApiResponse, EventModality } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventModalityService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}`;
  }

  getAll(): Observable<ApiResponse<EventModality[]>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.modality.getAll}`;
    return this.http.get<ApiResponse<EventModality[]>>(url);
  }
}
