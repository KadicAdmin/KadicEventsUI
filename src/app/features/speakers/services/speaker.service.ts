import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { Speaker, CreateSpeakerRequest, UpdateSpeakerRequest } from '../../../core/models';

@Injectable({
    providedIn: 'root'
})
export class SpeakerService extends BaseHttpService<Speaker, CreateSpeakerRequest, UpdateSpeakerRequest> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.speakers.base;
    }
}
