import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { ApiListResponse, ApiResponse } from '@core/models/common.models';
import { Speaker } from '@core/models/speaker.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}`;
  }

  getAll(): Observable<ApiResponse<Speaker[]>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.speakers.getAll}`;
    return this.http.get<ApiResponse<Speaker[]>>(url);
  }

  constructor() { }

}
