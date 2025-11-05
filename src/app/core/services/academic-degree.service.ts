import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AcademicDegree, API_CONFIG, ApiResponse } from '@core/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcademicDegreeService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}`;
  }

  getAll(): Observable<ApiResponse<AcademicDegree[]>> {
    const url = `${this.baseUrl}${API_CONFIG.endpoints.events.academicDegrees.getAll}`;
    return this.http.get<ApiResponse<AcademicDegree[]>>(url);
  }
}
