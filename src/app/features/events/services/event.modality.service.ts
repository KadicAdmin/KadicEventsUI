import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { Modality, ApiResponse } from '@core/models';
import { Observable } from 'rxjs';

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

  /**
   * Obtiene todas las modalidades disponibles
   * @returns Observable con la lista de modalidades envuelta en ApiResponse
   */
  getAll(): Observable<ApiResponse<Modality[]>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.modality.getAll}`;
    return this.http.get<ApiResponse<Modality[]>>(url);
  }
}
