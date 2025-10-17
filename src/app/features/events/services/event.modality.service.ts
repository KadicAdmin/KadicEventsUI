import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { EventModality } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventModalityService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}`;
  }

  getAll(): Observable<EventModality[]> {
    console.log(
      'Get All Modalities Service:',
      `${this.baseUrl}${API_CONFIG.endpoints.events.modality.getAll}`
    );
    console.log(
      this.http.get<EventModality[]>(
        `${this.baseUrl}${API_CONFIG.endpoints.events.modality.getAll}`
      )
    );
    return this.http.get<EventModality[]>(
      `${this.baseUrl}${API_CONFIG.endpoints.events.modality.getAll}`
    );
  }
}
