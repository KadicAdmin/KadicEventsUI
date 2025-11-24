import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '@core/config/api.config';
import { ApiResponse, EventType } from '@core/models';

type EventTypeCreateDto = Pick<EventType, 'name' | 'description' | 'isActive'>;
type EventTypeUpdateDto = Partial<EventTypeCreateDto>;

@Injectable({ providedIn: 'root' })
export class EventTypeService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return API_CONFIG.baseUrl;
  }

  private get basePath(): string {
    return `${this.baseUrl}${API_CONFIG.endpoints.events.eventTypes.base}`;
  }


  getAll(): Observable<ApiResponse<EventType[]>> {
    return this.http.get<ApiResponse<EventType[]>>(`${this.baseUrl}${API_CONFIG.endpoints.events.eventTypes.getAll}`);
  }

  getById(id: number | string): Observable<EventType> {
    return this.http.get<EventType>(`${this.basePath}/${id}`);
  }

  create(dto: EventTypeCreateDto): Observable<void> {
    return this.http.post<void>(this.basePath, dto);
  }

  update(id: number | string, dto: EventTypeUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.basePath}/${id}`, dto);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }
}
