import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '@core/index';

@Injectable({
  providedIn: 'root'
})
export class EventTagsService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.eventTags.base}`;
  }

  constructor() { }

}
