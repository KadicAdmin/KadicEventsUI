import { BaseEntity } from './common.models';

export interface Participant extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  registrationDate: Date;
  isConfirmed: boolean;
  isActive: boolean;
  eventId: number;
  academicTitleId?: number;
  academicLevelId?: number;
  studyAreaId?: number;
  educationalInstitutionId?: number;
}

export interface CreateParticipantRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  eventId: number;
  academicTitleId?: number;
  academicLevelId?: number;
  studyAreaId?: number;
  educationalInstitutionId?: number;
}

export interface UpdateParticipantRequest extends Partial<CreateParticipantRequest> {
  id: number;
}
