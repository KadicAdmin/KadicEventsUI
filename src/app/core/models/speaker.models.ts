import { BaseEntity } from './common.models';

export interface Speaker extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  profileImageUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  isActive: boolean;
  academicTitleId?: number;
  academicLevelId?: number;
  studyAreaId?: number;
  educationalInstitutionId?: number;
  academicTitle?: AcademicTitle;
  academicLevel?: AcademicLevel;
  studyArea?: StudyArea;
  educationalInstitution?: EducationalInstitution;
}

export interface CreateSpeakerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  profileImageUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  academicTitleId?: number;
  academicLevelId?: number;
  studyAreaId?: number;
  educationalInstitutionId?: number;
}

export interface UpdateSpeakerRequest extends Partial<CreateSpeakerRequest> {
  id: number;
}

export interface AcademicTitle extends BaseEntity {
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
