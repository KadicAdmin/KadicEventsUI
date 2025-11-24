import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ApiResponse, PaginatedResponse, SearchParams } from '../models';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService<T, TCreate = Partial<T>, TUpdate = Partial<T> & { id: number }> {
  protected readonly http = inject(HttpClient);

  protected abstract get baseEndpoint(): string;

  protected get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${this.baseEndpoint}`;
  }

  getAll(): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${id}`);
  }

  create(data: TCreate): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.baseUrl, data);
  }

  update(id: number, data: TUpdate): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  search(params: SearchParams): Observable<ApiResponse<PaginatedResponse<T>>> {
    let httpParams = new HttpParams();

    if (params.searchTerm) {
      httpParams = httpParams.set('searchTerm', params.searchTerm);
    }
    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.sortDirection) {
      httpParams = httpParams.set('sortDirection', params.sortDirection);
    }

    return this.http.get<ApiResponse<PaginatedResponse<T>>>(`${this.baseUrl}/search`, { params: httpParams });
  }
}
