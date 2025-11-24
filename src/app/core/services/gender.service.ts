import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { ApiResponse, Gender } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}`;
  }

  getAll(): Observable<ApiResponse<Gender[]>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.gender.getAll}`;
    return this.http.get<ApiResponse<Gender[]>>(url);
  }
}
