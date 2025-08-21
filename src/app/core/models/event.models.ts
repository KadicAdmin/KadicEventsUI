import { BaseEntity } from './common.models';
import { Speaker } from './speaker.models';
import { Participant } from './participant.models';

export interface Event extends BaseEntity {
  name: string; // La API usa 'name' en lugar de 'title'
  description?: string;
  startDate: Date | string; // Permitir tanto Date como string
  endDate: Date | string;   // Permitir tanto Date como string
  addresses: Address[]; // La API usa 'addresses' en lugar de 'location'
  maxParticipants?: number;
  currentParticipants?: number;
  isActive?: boolean;
  images?: EventImage[];
  eventTypeId: number;
  modalityId: number;
  eventType?: string; // La API devuelve string en lugar de objeto
  modality?: string;   // La API devuelve string en lugar de objeto
  virtualPlatformLink?: string;
  speakers?: Speaker[];
  participants?: Participant[];
  location?: string; // Agregamos location para uso en la tabla
}

export interface Address {
  id?: number;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface EventImage {
  id?: number;
  url: string;
  description?: string;
  isPrimary?: boolean;
}

export interface CreateEventRequest {
  name: string;
  description?: string;
  startDate: Date | string; // Permitir tanto Date como string
  endDate: Date | string;   // Permitir tanto Date como string
  addresses: Address[];
  maxParticipants?: number;
  images?: EventImage[];
  eventTypeId: number;
  modalityId: number;
  virtualPlatformLink?: string;
  speakerIds?: number[];
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: number;
}

export interface EventType extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface Modality extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
}
