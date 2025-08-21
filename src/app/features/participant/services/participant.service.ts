import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { Participant, CreateParticipantRequest, UpdateParticipantRequest } from '../../../core/models';

@Injectable({
    providedIn: 'root'
})
export class ParticipantService extends BaseHttpService<Participant, CreateParticipantRequest, UpdateParticipantRequest> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.participants.base;
    }
}
