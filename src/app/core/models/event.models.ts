import { BaseEntity } from './common.models';
import { Speaker } from './speaker.models';
import { Participant } from './participant.models';
import { StatItem } from './core.models';

export interface Event extends BaseEntity {
  name: string;
  description?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  category?: string;
  tags?: EventTags[];
  isActive?: boolean;
  images?: EventImage[];
  eventTypeId: number;
  eventType?: string;
  eventDates: EventDate[];
  participants?: Participant[];
  address: Address;
}

export interface EventTags {
  id: number;
  name: string;
  isActive: boolean;
}

export interface EventDate {
  id?: number;
  date: Date | string;
  talks: Talk[];
  speakers: Speaker[];
  schedules: Schedule[];
  modalities: EventModality[];
  locations: EventLocation[];
}

export interface Talk {
  id?: number;
  title: string;
  description?: string;
  duration: number;
  speakerId: number;
  speaker?: Speaker;
  startTime?: Date | string;
  endTime?: Date | string;
}

export interface Schedule {
  id?: number;
  startTime: Date | string;
  endTime: Date | string;
  talkId?: number;
  talk?: Talk;
  isBreak?: boolean;
  breakDescription?: string;
}

export interface EventModality {
  id?: number;
  name: string;
  isOnline: boolean;
  isInPerson: boolean;
  virtualPlatformLink?: string;
}

export interface EventLocation {
  id?: number;
  address: Address;
  isOnline: boolean;
  isInPerson: boolean;
  virtualPlatformLink?: string;
  latitude?: number;
  longitude?: number;
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
  maxParticipants?: number;
  images?: EventImage[];
  eventTypeId: number;
  address: Address;
  eventDates: CreateEventDateRequest[];
  tags: EventTags[]; // <-- lo que viaja al back
}

export interface CreateEventDateRequest {
  date: Date | string;
  talks: CreateTalkRequest[];
  speakerIds: number[];
  schedules: CreateScheduleRequest[];
  modalities: CreateEventModalityRequest[];
  locations: CreateEventLocationRequest[];
}

export interface CreateTalkRequest {
  title: string;
  description?: string;
  duration: number;
  speakerId: number;
  startTime?: Date | string;
  endTime?: Date | string;
}

export interface CreateScheduleRequest {
  startTime: Date | string;
  endTime: Date | string;
  talkId?: number;
  isBreak?: boolean;
  breakDescription?: string;
}

export interface CreateEventModalityRequest {
  modalityId: number;
  isOnline: boolean;
  isInPerson: boolean;
  virtualPlatformLink?: string;
}

export interface CreateEventLocationRequest {
  address: Address;
  isOnline: boolean;
  isInPerson: boolean;
  virtualPlatformLink?: string;
  latitude?: number;
  longitude?: number;
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
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface EventDetailData {
  event: Event;
  relatedEvents: Event[];
  organizerStats: StatItem[];
  policies: Array<{
    title: string;
    description: string;
    chipText?: string;
  }>;
  eventStats: StatItem[];
}

export interface EventCategory {
  id: number;
  name: string;
  isActive: true;
}
