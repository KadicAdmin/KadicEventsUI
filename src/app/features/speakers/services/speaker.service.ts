import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { ApiResponse } from '@core/models/common.models';
import { Speaker, CreateSpeakerRequest, UpdateSpeakerRequest } from '@core/models/speaker.models';
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

  getById(id: number): Observable<ApiResponse<Speaker>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.speakers.getById(id)}`;
    return this.http.get<ApiResponse<Speaker>>(url);
  }

  create(speaker: CreateSpeakerRequest): Observable<ApiResponse<Speaker>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.speakers.create}`;
    return this.http.post<ApiResponse<Speaker>>(url, speaker);
  }

  update(speaker: UpdateSpeakerRequest): Observable<ApiResponse<Speaker>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.speakers.update}`;
    return this.http.put<ApiResponse<Speaker>>(url, speaker);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.speakers.delete(id)}`;
    return this.http.delete<ApiResponse<void>>(url);
  }

  search(query: string): Observable<ApiResponse<Speaker[]>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.speakers.search}`;
    return this.http.get<ApiResponse<Speaker[]>>(url, { params: { q: query } });
  }

  constructor() { }

}
