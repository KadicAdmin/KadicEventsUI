import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import { Event, UpdateEventRequest } from '../../../core/models';
import { EventRequestDto, EventResp } from '../models/events.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.base}`;
  }

  /**
   * Obtener todos los eventos
   */
  getAll(): Observable<any> {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.events.getAll}/`;
    return this.http.get<any>(url);
  }

  /**
   * Obtener evento por ID
   */
  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crear un evento enviando FormData (datos + imagen)
   */
  create(event: EventRequestDto): Observable<EventResp> {
    const formData = this.convertToFormData(event);
    const url = `${API_CONFIG.baseUrl
      }${API_CONFIG.endpoints.events.createOrUpdate()}`;
    return this.http.post<EventResp>(url, formData);
  }

  /**
   * Actualizar evento
   */
  update(id: number, data: UpdateEventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Eliminar evento
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Convierte EventRequestDto a FormData para envío de archivos
   */
  private convertToFormData(event: EventRequestDto): FormData {
    const formData = new FormData();
    formData.append('Name', event.Name);
    formData.append('EventTypeId', event.EventTypeId.toString());
    formData.append('ModalityId', event.ModalityId.toString());

    if (event.VirtualPlatformLink) {
      formData.append('VirtualPlatformLink', event.VirtualPlatformLink);
    }

    // Fechas
    const startDate =
      event.StartDate instanceof Date
        ? event.StartDate.toISOString()
        : event.StartDate;
    const endDate =
      event.EndDate instanceof Date
        ? event.EndDate.toISOString()
        : event.EndDate;
    formData.append('StartDate', startDate);
    formData.append('EndDate', endDate);

    // event.AddressesNew.forEach((address, index) => {
    //   formData.append(`AddressesNew[${index}].Line1`, address.Line1);
    //   if (address.Line2) {
    //     formData.append(`AddressesNew[${index}].Line2`, address.Line2);
    //   }
    //   formData.append(`AddressesNew[${index}].CityId`, address.CityId.toString());
    // });

    // // Direcciones a eliminar
    // event.AddressesToDelete.forEach((id, index) => {
    //   formData.append(`AddressesToDelete[${index}]`, id.toString());
    // });

    event.ImagesNew.forEach((image, index) => {
      formData.append(`ImagesNew[${index}].File`, image.File);
      if (image.Caption) {
        formData.append(`ImagesNew[${index}].Caption`, image.Caption);
      }
      formData.append(
        `ImagesNew[${index}].IsMain`,
        (image.IsMain ?? false).toString()
      );
    });

    // Imágenes a eliminar
    event.ImagesToDelete.forEach((id, index) => {
      formData.append(`ImagesToDelete[${index}]`, id.toString());
    });

    return formData;
  }
}
