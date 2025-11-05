import { BaseEntity } from './common.models';

export interface Speaker extends BaseEntity {
  id: number;
  name: string;
  lastName: string;
  birthDay: string;
  gendersId: number;
  countriesId: number;
  email: string;
  phoneNumber: string;
  commentary?: string;
  academicDegreesId: number;
  academicLevelsId: number;
  areaOfStudyId: number;
  profileImageUrl?: string;
}

export interface SpeakerTalkRequest {
  id: number;
  speakerId: number;
  eventDateTalkId: number;
}

export interface CreateSpeakerRequest {
  name: string;
  lastName: string;
  birthDay: string;
  gendersId: number;
  countriesId: number;
  email: string;
  phoneNumber: string;
  commentary?: string;
  academicDegreesId: number;
  academicLevelsId: number;
  areaOfStudyId: number;
}

export interface UpdateSpeakerRequest extends Partial<CreateSpeakerRequest> {
  id: number;
}

export interface AcademicDegree extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface AcademicLevel extends BaseEntity {
  name: string;
  description?: string;
  level: number;
  isActive: boolean;
}

export interface StudyArea extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface EducationalInstitution extends BaseEntity {
  name: string;
  country: string;
  city: string;
  website?: string;
  isActive: boolean;
}
