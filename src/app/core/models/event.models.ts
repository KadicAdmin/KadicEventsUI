import { BaseEntity } from './common.models';
import { Speaker } from './speaker.models';
import { Participant } from './participant.models';
import { StatItem } from './core.models';

//

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
  eventId: number;
  imageUrl: string;
  caption: string;
  isMain: boolean;
  createAt: string;
}

// export interface GalleryImage {
//   id: string;
//   title: string;
//   description: string | null;
//   imageUrl: string;
//   thumbnailUrl: string | null;
//   status: 'active' | 'inactive' | 'deleted';
//   createdAt: string;
// }

//new implementation
export interface CreateImageRequest {
  userId: string;
  title: string;
  description?: string;
  imageBase64: string;
}

export interface ImageResponse {
  status: any;
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreateEventRequest {
  name: string;
  description?: string;
  eventCategoryID: number;
  maxParticipants?: number;
  images?: EventImage[];
  eventTypeId: number;
  tags: CreateEventTag[];
  eventDates: CreateEventDateRequest[];
}

export interface CreateEventTag {
  tagId: number;
}

export interface CreateEventDateRequest {
  date: Date | string;
  title: string;
  description?: string;
  mainImage: string;
  virtualLink?: string | null;
  eventDatesModalities: CreateEventModalityRequest[];
  eventAddress: CreateEventAddressRequest | null;
  eventDateTalk: CreateEventDateTalkRequest[];
}

export interface CreateEventAddressRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateEventDateTalkRequest {
  startHour: string;
  endHour: string;
  title: string;
  description?: string;
  duration: number;
  imageUrl: string;
  speakerTalk: CreateSpeakerTalkRequest[];
}

export interface CreateSpeakerTalkRequest {
  speakerId: number;
}

export interface CreateTalkRequest {
  title: string;
  description?: string;
  duration: number;
  imageUrl: string;
  speakerTalk: Speaker[];
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
