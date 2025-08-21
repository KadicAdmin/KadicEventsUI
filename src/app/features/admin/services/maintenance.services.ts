import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { BaseHttpService } from '../../../core/services/base-http.service';
import {
    AcademicTitle,
    AcademicLevel,
    StudyArea,
    EducationalInstitution,
    EventType,
    Modality
} from '../../../core/models';

@Injectable({
    providedIn: 'root'
})
export class AcademicTitleService extends BaseHttpService<AcademicTitle> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.academicTitles.base;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AcademicLevelService extends BaseHttpService<AcademicLevel> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.academicLevels.base;
    }
}

@Injectable({
    providedIn: 'root'
})
export class StudyAreaService extends BaseHttpService<StudyArea> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.studyAreas.base;
    }
}

@Injectable({
    providedIn: 'root'
})
export class EducationalInstitutionService extends BaseHttpService<EducationalInstitution> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.educationalInstitutions.base;
    }
}

@Injectable({
    providedIn: 'root'
})
export class EventTypeService extends BaseHttpService<EventType> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.eventTypes.base;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ModalityService extends BaseHttpService<Modality> {
    protected get baseEndpoint(): string {
        return API_CONFIG.endpoints.modalities.base;
    }
}
