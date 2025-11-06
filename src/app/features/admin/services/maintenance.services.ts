import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { BaseHttpService } from '../../../core/services/base-http.service';
import {
  AcademicDegree,
  AcademicLevel,
  StudyArea,
  EducationalInstitution,
  EventType,
  Modality,
} from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class AcademicDegreeService extends BaseHttpService<AcademicDegree> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.academicDegrees.base;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AcademicLevelService extends BaseHttpService<AcademicLevel> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.academicLevels.getAll;
  }
}

@Injectable({
  providedIn: 'root',
})
export class StudyAreaService extends BaseHttpService<StudyArea> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.areaOfStudys.base;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EducationalInstitutionService extends BaseHttpService<EducationalInstitution> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.educationalInstitutions.base;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EventTypeService extends BaseHttpService<EventType> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.eventTypes.base;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ModalityService extends BaseHttpService<Modality> {
  protected get baseEndpoint(): string {
    return API_CONFIG.endpoints.events.modalities.base;
  }
}
