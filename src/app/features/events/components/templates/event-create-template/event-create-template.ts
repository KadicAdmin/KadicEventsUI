import { Component, input, output, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Message } from 'primeng/message';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { SectionHeaderComponent } from '@shared/components/atoms/section-header';
import { IconBadgeComponent } from '@shared/components/atoms/icon-badge';
import { EmptyStateComponent } from '@shared/components/atoms/empty-state';
import { SpeakerCardComponent } from '@shared/components/molecules/speaker-card';
import { TalkCardComponent } from '@shared/components/molecules/talk-card';
import { LocationCardComponent } from '@shared/components/molecules/location-card';
import { ImageGalleryUploadComponent } from '@shared/components/molecules/image-gallery-upload';
import { EventDateDialogComponent } from '@shared/components/organisms/event-date-dialog';
import { SpeakerDialogComponent } from '@shared/components/organisms/speaker-dialog';
import { TalkDialogComponent } from '@shared/components/organisms/talk-dialog';
import { LocationDialogComponent } from '@shared/components/organisms/location-dialog';


interface Modality {
  name: string;
  code: 'On' | 'Off';
  id: number;
}

@Component({
  selector: 'app-event-create-template',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    Select,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    Message,
    AccordionModule,
    TabsModule,
    TooltipModule,
    SectionHeaderComponent,
    IconBadgeComponent,
    EmptyStateComponent,
    SpeakerCardComponent,
    TalkCardComponent,
    LocationCardComponent,
    ImageGalleryUploadComponent,
    EventDateDialogComponent,
    SpeakerDialogComponent,
    TalkDialogComponent,
    LocationDialogComponent,
  ],
  templateUrl: './event-create-template.html',
})
export class EventCreateTemplateComponent {
  private confirmationService = inject(ConfirmationService);

  readonly form = input.required<FormGroup>();
  readonly modalities = input.required<Modality[]>();
  readonly eventTypes = input.required<{ name: string; id: number }[]>();
  readonly academicTitles = input<any[]>([]);
  readonly academicLevels = input<any[]>([]);
  readonly studyAreas = input<any[]>([]);
  readonly educationalInstitutions = input<any[]>([]);
  readonly isFieldInvalid = input.required<(fieldName: string) => boolean>();
  readonly getFieldErrorMessage = input.required<(fieldName: string) => string>();
  readonly hasFormLevelErrors = input.required<() => boolean>();
  readonly getFormLevelErrors = input.required<() => string[]>();

  readonly getEventDates = input.required<any[]>();
  readonly getEventDateLocation = input.required<(index: number) => any>();
  readonly getSpeakers = input.required<(eventDateIndex: number) => any[]>();
  readonly getTalks = input.required<(eventDateIndex: number) => any[]>();

  readonly addEventDate = output<void>();
  readonly removeEventDate = output<number>();
  readonly editLocation = output<number>();
  readonly clearLocation = output<number>();
  readonly addSpeaker = output<number>();
  readonly removeSpeaker = output<{ eventDateIndex: number; speakerIndex: number }>();
  readonly addTalk = output<number>();
  readonly removeTalk = output<{ eventDateIndex: number; talkIndex: number }>();

  readonly onUpload = output<FileUploadEvent>();
  readonly onFileSelect = output<any>();
  readonly onFileRemove = output<any>();
  readonly onImagesChange = output<any[]>();
  readonly onMainImageChange = output<any>();
  readonly onSubmit = output<void>();

  showEventDateDialog = signal(false);
  showSpeakerDialog = signal(false);
  showTalkDialog = signal(false);
  showLocationDialog = signal(false);
  editingEventDateIndex = signal<number | null>(null);
  editingSpeakerIndex = signal<number | null>(null);
  editingTalkIndex = signal<number | null>(null);
  editingLocationEventDateIndex = signal<number | null>(null);
  currentEventDateIndexForSpeaker = signal<number | null>(null);
  currentEventDateIndexForTalk = signal<number | null>(null);
  speakerImagePreview = signal<string>('');
  talkImagePreview = signal<string>('');

  openEventDateDialog() {
    this.editingEventDateIndex.set(null);
    this.showEventDateDialog.set(true);
  }

  openSpeakerDialogForEventDate(eventDateIndex: number) {
    this.currentEventDateIndexForSpeaker.set(eventDateIndex);
    this.editingSpeakerIndex.set(null);
    this.speakerImagePreview.set('');
    this.addSpeaker.emit(eventDateIndex);

    const speakers = this.getSpeakers()(eventDateIndex);
    this.editingSpeakerIndex.set(speakers.length - 1);

    this.showSpeakerDialog.set(true);
  }

  openTalkDialogForEventDate(eventDateIndex: number) {
    this.currentEventDateIndexForTalk.set(eventDateIndex);
    this.editingTalkIndex.set(null);
    this.talkImagePreview.set('');
    this.addTalk.emit(eventDateIndex);

    const talks = this.getTalks()(eventDateIndex);
    this.editingTalkIndex.set(talks.length - 1);

    this.showTalkDialog.set(true);
  }

  editEventDate(index: number) {
    this.editingEventDateIndex.set(index);
    this.showEventDateDialog.set(true);
  }

  confirmDeleteEventDate(index: number) {
    const eventDate = this.getEventDates()[index];
    const title = eventDate.get('title')?.value || 'Sin título';

    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar la fecha "${title}"? Esta acción no se puede deshacer.`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.removeEventDate.emit(index);
      }
    });
  }

  editSpeaker(eventDateIndex: number, speakerIndex: number) {
    this.currentEventDateIndexForSpeaker.set(eventDateIndex);
    this.editingSpeakerIndex.set(speakerIndex);
    const speaker = this.getSpeakers()(eventDateIndex)[speakerIndex];
    this.speakerImagePreview.set(speaker.get('imageUrl')?.value || '');
    this.showSpeakerDialog.set(true);
  }

  editTalk(eventDateIndex: number, talkIndex: number) {
    this.currentEventDateIndexForTalk.set(eventDateIndex);
    this.editingTalkIndex.set(talkIndex);
    const talk = this.getTalks()(eventDateIndex)[talkIndex];
    this.talkImagePreview.set(talk.get('imageUrl')?.value || '');
    this.showTalkDialog.set(true);
  }

  saveEventDate() {
    if (this.editingEventDateIndex() === null) {
      this.addEventDate.emit();
    }
    this.showEventDateDialog.set(false);
  }

  saveSpeaker() {
    this.showSpeakerDialog.set(false);
    this.currentEventDateIndexForSpeaker.set(null);
    this.editingSpeakerIndex.set(null);
  }

  cancelSpeaker() {
    const eventDateIndex = this.currentEventDateIndexForSpeaker();
    const speakerIndex = this.editingSpeakerIndex();

    if (eventDateIndex !== null && speakerIndex !== null) {
      const speakers = this.getSpeakers()(eventDateIndex);
      const speakerForm = speakers[speakerIndex] as FormGroup;

      if (!speakerForm.value.firstName && !speakerForm.value.lastName) {
        this.removeSpeaker.emit({ eventDateIndex, speakerIndex });
      }
    }

    this.showSpeakerDialog.set(false);
    this.currentEventDateIndexForSpeaker.set(null);
    this.editingSpeakerIndex.set(null);
  }

  saveTalk() {
    this.showTalkDialog.set(false);
    this.currentEventDateIndexForTalk.set(null);
    this.editingTalkIndex.set(null);
  }

  cancelTalk() {
    const eventDateIndex = this.currentEventDateIndexForTalk();
    const talkIndex = this.editingTalkIndex();

    if (eventDateIndex !== null && talkIndex !== null) {
      const talks = this.getTalks()(eventDateIndex);
      const talkForm = talks[talkIndex] as FormGroup;

      if (!talkForm.value.title) {
        this.removeTalk.emit({ eventDateIndex, talkIndex });
      }
    }

    this.showTalkDialog.set(false);
    this.currentEventDateIndexForTalk.set(null);
    this.editingTalkIndex.set(null);
  }

  editEventDateLocation(eventDateIndex: number) {
    this.editingLocationEventDateIndex.set(eventDateIndex);
    this.showLocationDialog.set(true);
    this.editLocation.emit(eventDateIndex);
  }

  saveLocation() {
    this.showLocationDialog.set(false);
    this.editingLocationEventDateIndex.set(null);
  }

  clearCurrentEventDateLocation() {
    const index = this.editingEventDateIndex();
    if (index !== null) {
      this.clearLocation.emit(index);
    }
  }

  getCurrentEventDateForm(): FormGroup | undefined {
    const index = this.editingEventDateIndex();
    if (index !== null && this.getEventDates()[index]) {
      return this.getEventDates()[index] as FormGroup;
    }
    return this.getEventDates()[this.getEventDates().length - 1] as FormGroup;
  }

  getCurrentEventDateLocation(): FormGroup | undefined {
    const index = this.editingEventDateIndex();
    if (index !== null) {
      const eventDate = this.getEventDates()[index] as FormGroup;
      return eventDate?.get('location') as FormGroup;
    }
    const lastEventDate = this.getEventDates()[this.getEventDates().length - 1] as FormGroup;
    return lastEventDate?.get('location') as FormGroup;
  }

  getCurrentLocationForm(): FormGroup | undefined {
    const index = this.editingLocationEventDateIndex();
    if (index !== null) {
      return this.getEventDateLocation()(index) as FormGroup;
    }
    return undefined;
  }

  getCurrentSpeakerForm(): FormGroup | undefined {
    const eventDateIndex = this.currentEventDateIndexForSpeaker();
    const speakerIndex = this.editingSpeakerIndex();

    if (eventDateIndex !== null) {
      const speakers = this.getSpeakers()(eventDateIndex);
      if (speakerIndex !== null && speakers[speakerIndex]) {
        return speakers[speakerIndex] as FormGroup;
      }
      return speakers[speakers.length - 1] as FormGroup;
    }
    return undefined;
  }

  getCurrentTalkForm(): FormGroup | undefined {
    const eventDateIndex = this.currentEventDateIndexForTalk();
    const talkIndex = this.editingTalkIndex();

    if (eventDateIndex !== null) {
      const talks = this.getTalks()(eventDateIndex);
      if (talkIndex !== null && talks[talkIndex]) {
        return talks[talkIndex] as FormGroup;
      }
      return talks[talks.length - 1] as FormGroup;
    }
    return undefined;
  }


  onSpeakerImageSelect(event: any) {
    const file = event.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.speakerImagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onTalkImageSelect(event: any) {
    const file = event.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.talkImagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
