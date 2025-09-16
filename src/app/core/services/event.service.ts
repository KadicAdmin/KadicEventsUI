import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { BaseHttpService } from './base-http.service';
import { Event, CreateEventRequest, UpdateEventRequest, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseHttpService<Event, CreateEventRequest, UpdateEventRequest> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.base;
  }

  /**
   * Método específico para crear eventos con archivos (FormData)
   * @param formData - FormData con los datos del evento e imágenes
   * @returns Observable<ApiResponse<Event>>
   */
  createWithFiles(formData: FormData): Observable<ApiResponse<Event>> {
    return this.http.post<ApiResponse<Event>>(this.baseUrl, formData);
  }
}
