import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '@core/config/api.config';
import { EventType } from '@core/models';

type EventTypeCreateDto = Pick<EventType, 'name' | 'description' | 'isActive'>;
type EventTypeUpdateDto = Partial<EventTypeCreateDto>;

@Injectable({ providedIn: 'root' })
export class EventTypeService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return API_CONFIG.baseUrl;
  }

  private get basePath(): string {
    return `${this.baseUrl}${API_CONFIG.endpoints.events.eventTypes.base}`; // /EventTypes
  }

  private get listPath(): string {
    return `${this.baseUrl}${API_CONFIG.endpoints.events.eventTypes.getAll}`; // /EventTypes
  }

  /** GET /EventTypes  -> arreglo simple */
  listAll(params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
  }): Observable<EventType[]> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.page != null)
      httpParams = httpParams.set('page', String(params.page));
    if (params?.pageSize != null)
      httpParams = httpParams.set('pageSize', String(params.pageSize));
    if (params?.sortField)
      httpParams = httpParams.set('sortField', params.sortField);
    if (params?.sortOrder)
      httpParams = httpParams.set('sortOrder', params.sortOrder);

    return this.http.get<EventType[]>(this.listPath, { params: httpParams });
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
