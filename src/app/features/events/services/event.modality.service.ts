import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { Modality, ApiResponse, EventModality } from '@core/models';
import { Observable, of } from 'rxjs';

/**
 * Servicio para gestionar las modalidades de eventos
 * 
 * @example
 * // En tu componente:
 * import { extractData } from '@core/utils/api-response.utils';
 * 
 * modalities = toSignal(
 *   this.modalityService.getAll().pipe(extractData()),
 *   { initialValue: [] }
 * );
 */
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
    console.log(url);
    return this.http.get<ApiResponse<EventModality[]>>(url);
  }
}
