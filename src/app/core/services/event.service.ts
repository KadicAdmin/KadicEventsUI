import { Injectable } from '@angular/core';
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

}
