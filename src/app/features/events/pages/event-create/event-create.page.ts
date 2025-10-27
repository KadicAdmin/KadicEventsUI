import { EventService } from '../../services/event.service';
import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EventCreateTemplateComponent } from '../../components/templates/event-create-template/event-create-template';
import { EventModalityService } from '../../services/event.modality.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  EventModality,
  EventType,
  EventTags,
  EventCategory,
  Speaker,
} from '@core/models';
import { extractData } from '@core/utils/api-response.utils';
import { ImageUtil } from '@core/utils';
import { EventTypeService } from '../../services/event.type.service';
import { EventTagsService } from '../../services/event-tags.service';
import { EventCategoryService } from '../../services/event.category.service';
import { SpeakerService } from '../../../speakers/services/speaker.service';
import { EventResp } from '../../models/events.interfaces';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    EventCreateTemplateComponent,
  ],
  templateUrl: './event-create.page.html',
  styleUrl: './event-create.page.css',
  providers: [MessageService, ConfirmationService],
})
export class EventCreatePage {
  myForm!: FormGroup;
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly $modalities = inject(EventModalityService).getAll();
  readonly modalities = toSignal(this.$modalities.pipe(extractData()), {
    initialValue: [] as EventModality[],
  });
  readonly $eventTypes = inject(EventTypeService).getAll();
  readonly eventTypes = toSignal(this.$eventTypes.pipe(extractData()), {
    initialValue: [] as EventType[],
  });
  readonly $tags = inject(EventTagsService).getAll();
  readonly tags = toSignal(this.$tags.pipe(extractData()), {
    initialValue: [] as EventTags[],
  });

  readonly categories = toSignal(
    inject(EventCategoryService).getAll().pipe(extractData()),
    { initialValue: [] as EventCategory[] }
  );

  readonly speakers = toSignal(
    inject(SpeakerService).getAll().pipe(extractData()),
    { initialValue: [] as Speaker[] }
  );

  readonly speakerService = inject(SpeakerService);

  readonly academicTitles = signal<{ name: string; id: number }[]>([
    { name: 'Dr.', id: 1 },
    { name: 'PhD', id: 2 },
    { name: 'MSc', id: 3 },
    { name: 'BSc', id: 4 },
    { name: 'Ing.', id: 5 },
    { name: 'Lic.', id: 6 },
  ]);

  readonly academicLevels = signal<{ name: string; id: number }[]>([
    { name: 'Doctorado', id: 1 },
    { name: 'Maestría', id: 2 },
    { name: 'Licenciatura', id: 3 },
    { name: 'Técnico Superior', id: 4 },
    { name: 'Técnico', id: 5 },
  ]);

  readonly studyAreas = signal<{ name: string; id: number }[]>([
    { name: 'Ingeniería de Software', id: 1 },
    { name: 'Ciencias de la Computación', id: 2 },
    { name: 'Sistemas de Información', id: 3 },
    { name: 'Inteligencia Artificial', id: 4 },
    { name: 'Ciberseguridad', id: 5 },
    { name: 'Redes y Telecomunicaciones', id: 6 },
  ]);

  readonly educationalInstitutions = signal<{ name: string; id: number }[]>([
    { name: 'Universidad Autónoma de Santo Domingo (UASD)', id: 1 },
    { name: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)', id: 2 },
    { name: 'Instituto Tecnológico de Santo Domingo (INTEC)', id: 3 },
    { name: 'Universidad Iberoamericana (UNIBE)', id: 4 },
    { name: 'Universidad APEC (UNAPEC)', id: 5 },
  ]);

  constructor() {
    effect(() => {});
    this.initializeForm();
    this.setupRealtimeValidation();
  }
  private initializeForm(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      categoryId: [null, Validators.required],
      tags: [[]],
      maxParticipants: [null],
      eventTypeId: [null, Validators.required],
      mainImage: [null],
      images: [[]],
      eventDates: this.fb.array([]),
      speakers: this.fb.array([]),
    });
  }

  // FormArray getters
  get eventDatesArray(): any[] {
    const dates = (this.myForm.get('eventDates') as FormArray).controls;
    return dates;
  }

  getSpeakersForEventDate(eventDateIndex: number): any[] {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const speakers = eventDate.get('speakers') as FormArray;
    return speakers?.controls || [];
  }

  getTalksForEventDate(eventDateIndex: number): any[] {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const talks = eventDate.get('talks') as FormArray;
    return talks?.controls || [];
  }

  private createEventDateGroup(): FormGroup {
    return this.fb.group({
      date: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      mainImage: [null],
      modalities: [[]],
      location: this.createLocationGroup(),
      speakers: this.fb.array([]),
      talks: this.fb.array([]),
      schedules: this.fb.array([]),
    });
  }

  addEventDate(): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const newEventDate = this.createEventDateGroup();

    eventDates.push(newEventDate);
  }

  removeEventDate(index: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    eventDates.removeAt(index);
  }

  getEventDateLocation(eventDateIndex: number): FormGroup | null {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const location = eventDate.get('location') as FormGroup;

    return location;
  }

  // Location methods
  private createLocationGroup(): FormGroup {
    return this.fb.group({
      name: [null],
      address: [null],
      latitude: [null],
      longitude: [null],
    });
  }

  editLocation(eventDateIndex: number): void {}

  clearLocation(eventDateIndex: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const location = eventDate.get('location') as FormGroup;
    location.reset();
  }

  private createSpeakerGroup(): FormGroup {
    return this.fb.group({
      speakerId: [null, Validators.required],
      name: [''],
      lastName: [''],
      email: [''],
    });
  }

  addEmptySpeakerToEventDate(eventDateIndex: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const speakers = eventDate.get('speakers') as FormArray;
    speakers.push(this.createSpeakerGroup());
  }

  removeSpeakerFromEventDate(
    eventDateIndex: number,
    speakerIndex: number
  ): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const speakers = eventDate.get('speakers') as FormArray;
    speakers.removeAt(speakerIndex);
  }

  private createTalkGroup(): FormGroup {
    return this.fb.group({
      talkId: [null, Validators.required],
      title: [''],
      description: [''],
      duration: [null],
    });
  }

  addTalkToEventDate(eventDateIndex: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const talks = eventDate.get('talks') as FormArray;
    talks.push(this.createTalkGroup());
  }

  removeTalkFromEventDate(eventDateIndex: number, talkIndex: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const talks = eventDate.get('talks') as FormArray;
    talks.removeAt(talkIndex);
  }

  // Speaker management methods
  onCreateSpeaker(data: { speakerData: any; eventDateIndex: number }): void {
    const { speakerData, eventDateIndex } = data;

    const createRequest = {
      name: speakerData.name || '',
      lastName: speakerData.lastName || '',
      birthDay: speakerData.birthDay || '2000-01-01',
      gendersId: speakerData.gendersId || 1,
      countriesId: speakerData.countriesId || 1,
      email: speakerData.email || '',
      phoneNumber: speakerData.phoneNumber || '',
      commentary: speakerData.commentary || '',
      academicDegreesId: speakerData.academicDegreesId || 1,
      academicLevelsId: speakerData.academicLevelsId || 1,
      areaOfStudyId: speakerData.areaOfStudyId || 1,
      educationalInstitutionId: speakerData.educationalInstitutionId || null,
      linkedInUrl: speakerData.linkedInUrl || '',
      twitterUrl: speakerData.twitterUrl || '',
      websiteUrl: speakerData.websiteUrl || '',
    };

    this.speakerService.create(createRequest).subscribe({
      next: (response) => {
        if (response.data) {
          this.addSpeakerToEventDate(eventDateIndex, response.data);
          this.messageService.add({
            severity: 'success',
            summary: 'Speaker Creado',
            detail: `${response.data.name} ${response.data.lastName} ha sido creado exitosamente.`,
            life: 3000,
          });
        }
      },
      error: (error) => {
        let errorMessage = 'No se pudo crear el speaker. Intenta nuevamente.';
        let errorSummary = 'Error al crear speaker';

        if (error?.status === 409) {
          errorSummary = 'Speaker Ya Existe';
          errorMessage =
            'Ya existe un speaker registrado con este email. Por favor, usa la opción "Seleccionar Existente" para agregarlo al evento.';
        } else if (error?.error?.message) {
          errorMessage = error.error.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        this.messageService.add({
          severity: 'warn',
          summary: errorSummary,
          detail: errorMessage,
          life: 7000,
        });
      },
    });
  }

  onUpdateSpeaker(data: {
    speaker: Speaker;
    eventDateIndex: number;
    speakerIndex: number;
  }): void {
    const { speaker, eventDateIndex, speakerIndex } = data;

    const updateRequest = {
      id: speaker.id,
      name: speaker.name,
      lastName: speaker.lastName,
      birthDay: speaker.birthDay,
      gendersId: speaker.gendersId,
      countriesId: speaker.countriesId,
      email: speaker.email,
      phoneNumber: speaker.phoneNumber,
      commentary: speaker.commentary,
      academicDegreesId: speaker.academicDegreesId,
      academicLevelsId: speaker.academicLevelsId,
      areaOfStudyId: speaker.areaOfStudyId,
      educationalInstitutionId:
        (speaker as any).educationalInstitutionId || null,
      linkedInUrl: (speaker as any).linkedInUrl || '',
      twitterUrl: (speaker as any).twitterUrl || '',
      websiteUrl: (speaker as any).websiteUrl || '',
    };

    this.speakerService.update(updateRequest).subscribe({
      next: (response) => {
        if (response.data) {
          // Actualizar el formulario con los datos actualizados
          const eventDates = this.myForm.get('eventDates') as FormArray;
          const eventDate = eventDates.at(eventDateIndex) as FormGroup;
          const speakers = eventDate.get('speakers') as FormArray;
          const speakerForm = speakers.at(speakerIndex) as FormGroup;

          speakerForm.patchValue({
            speakerId: response.data.id,
            name: response.data.name,
            lastName: response.data.lastName,
            email: response.data.email,
          });

          this.messageService.add({
            severity: 'success',
            summary: 'Speaker Actualizado',
            detail: `${response.data.name} ${response.data.lastName} ha sido actualizado exitosamente.`,
            life: 3000,
          });
        }
      },
      error: (error) => {
        let errorMessage =
          'No se pudo actualizar el speaker. Intenta nuevamente.';
        let errorSummary = 'Error al actualizar speaker';

        // Manejar error 409 - Conflict
        if (error?.status === 409) {
          errorSummary = 'Conflicto al Actualizar';
          errorMessage =
            'El email ingresado ya está registrado con otro speaker.';
        } else if (error?.error?.message) {
          errorMessage = error.error.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: errorSummary,
          detail: errorMessage,
          life: 5000,
        });
      },
    });
  }

  onSelectExistingSpeaker(data: {
    speaker: Speaker;
    eventDateIndex: number;
  }): void {
    const { speaker, eventDateIndex } = data;
    this.addSpeakerToEventDate(eventDateIndex, speaker);
  }

  private addSpeakerToEventDate(
    eventDateIndex: number,
    speaker: Speaker
  ): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const speakers = eventDate.get('speakers') as FormArray;

    const speakerForm = this.fb.group({
      speakerId: [speaker.id],
      name: [speaker.name],
      lastName: [speaker.lastName],
      email: [speaker.email],
    });

    speakers.push(speakerForm);
  }

  // Validation methods
  private setupRealtimeValidation(): void {
    const fieldsToValidate = ['name', 'eventTypeId'];

    fieldsToValidate.forEach((fieldName) => {
      const control = this.myForm.get(fieldName);
      if (control) {
        control.valueChanges.subscribe(() => {
          if (control.dirty && !control.touched) {
            control.markAsTouched();
          }
        });
      }
    });
  }

  private getFormErrors(): any {
    let formErrors: any = {};

    Object.keys(this.myForm.controls).forEach((key) => {
      const controlErrors = this.myForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });

    return formErrors;
  }

  logAllFormErrors(): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const formLevelErrors = this.getFormLevelErrors();
    const fieldErrors = this.getFormErrors();
    const totalFieldErrors = Object.keys(fieldErrors).length;
    const totalFormErrors = formLevelErrors.length;
    const totalErrors = totalFieldErrors + totalFormErrors;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.myForm.get(fieldName);
    if (!field || !field.errors || (!field.dirty && !field.touched)) {
      return '';
    }

    const errors = field.errors;

    if (errors['required']) {
      return this.getRequiredMessage(fieldName);
    }

    if (errors['email']) {
      return 'Por favor ingresa un email válido';
    }

    if (errors['minlength']) {
      return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      return `No puede exceder ${errors['maxlength'].requiredLength} caracteres`;
    }

    if (errors['pattern']) {
      return 'El formato no es válido';
    }

    return 'Este campo tiene un error';
  }

  private getRequiredMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      name: 'El nombre del evento es requerido',
      eventTypeId: 'Selecciona un tipo de evento',
      categoryId: 'Selecciona una categoría',
      date: 'La fecha es requerida',
      title: 'El título de la fecha es requerido',
      speakerId: 'El ID del speaker es requerido',
      talkId: 'El ID del talk es requerido',
    };

    return messages[fieldName] || 'Este campo es requerido';
  }

  getFormLevelErrors(): string[] {
    const errors: string[] = [];

    // Validar que haya al menos una fecha de evento
    const eventDates = this.myForm.get('eventDates') as FormArray;
    if (eventDates.length === 0) {
      // errors.push('Debes agregar al menos una fecha para el evento');
    }

    if (this.myForm.errors?.['dateRange']) {
      const dateRangeError = this.myForm.errors['dateRange'];
      if (dateRangeError.message) {
        errors.push(dateRangeError.message);
      } else {
        errors.push('Las fechas del evento no son válidas');
      }
    }

    return errors;
  }

  hasFormLevelErrors(): boolean {
    return this.getFormLevelErrors().length > 0;
  }

  // File upload methods
  onUpload(ev: FileUploadEvent) {
    const file = ev.files?.[0];
    if (file) {
      this.myForm.patchValue({ mainImage: file });
    }
  }

  onFileSelect(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.myForm.patchValue({ mainImage: file });
    }
  }

  onFileRemove(event: any) {
    this.myForm.patchValue({ mainImage: null });
  }

  onImagesChange(images: any[]) {
    this.myForm.patchValue({ images: images });
  }

  onMainImageChange(mainImage: any) {
    this.myForm.patchValue({ mainImage: mainImage?.file || null });
  }

  // Submit
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.logAllFormErrors();

      const errors = this.getFormErrors();
      const errorCount = Object.keys(errors).length;
      const formLevelErrors = this.getFormLevelErrors().length;
      const totalErrors = errorCount + formLevelErrors;

      let errorMessage = 'Por favor corrige los errores en el formulario.';
      if (totalErrors === 1) {
        errorMessage = 'Por favor corrige el error en el formulario.';
      } else if (totalErrors > 1) {
        errorMessage = `Por favor corrige los ${totalErrors} errores en el formulario.`;
      }

      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario incompleto',
        detail: errorMessage,
        life: 5000,
      });
      return;
    }

    // Process event images
    let processedImages: any[] = [];
    console.log('Processing event images:', this.myForm.value.images);

    if (this.myForm.value.images && Array.isArray(this.myForm.value.images)) {
      const imagesArray = Array.isArray(this.myForm.value.images[0])
        ? this.myForm.value.images[0]
        : this.myForm.value.images;

      processedImages = ImageUtil.processImagesArray(imagesArray);
    }

    //
    let processedMainImages: any[] = [];

    // if (this.myForm.value.images && Array.isArray(this.myForm.value.images)) {
    //   const imagesArray = Array.isArray(this.myForm.value.images[0])
    //     ? this.myForm.value.images[0]
    //     : this.myForm.value.images;

    //   processedMainImages = ImageUtil.processImagesArray(imagesArray);
    // }

    this.myForm.value.eventDates.forEach((eventDate: any) => {
      if (eventDate.mainImage) {
        console.log(
          'Processing main image for event date:',
          eventDate.mainImage
        );
        const imagesArray = Array.isArray(eventDate.mainImage)
          ? eventDate.mainImage[0]
          : eventDate.mainImage;

        processedMainImages = ImageUtil.processImagesArray(imagesArray);
        eventDate.mainImage = processedMainImages;
      }
    });

    const tagIds: number[] = this.myForm.value.tags ?? [];
    const tagsPayload = tagIds.map((id) => ({ TagId: id }));
    const eventRequest: any = {
      name: this.myForm.value.name || '',
      description: this.myForm.value.description || '',
      eventCategoryID: this.myForm.value.categoryId || 0,
      eventTypeId: this.myForm.value.eventTypeId || 0,
      maxParticipants: this.myForm.value.maxParticipants || 0,
      images: processedImages,
      tags: tagsPayload,
      eventDates: this.myForm.value.eventDates || [],
    };

    this.eventService.create(eventRequest).subscribe({
      next: (res: EventResp) => {
        this.messageService.clear();
        this.myForm.reset();
        this.confirmationService.confirm({
          message:
            '¡El evento se ha creado exitosamente! ¿Deseas ir a la lista de eventos?',
          header: '✅ Evento Creado',
          icon: 'pi pi-check-circle',
          acceptIcon: 'pi pi-check',
          rejectIcon: 'pi pi-times',
          acceptLabel: 'Ver Eventos',
          rejectLabel: 'Crear Otro',
          acceptButtonStyleClass: 'p-button-success',
          rejectButtonStyleClass: 'p-button-secondary',
          accept: () => {
            this.router.navigate(['/events']);
          },
          reject: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Listo para otro evento',
              detail: 'Puedes crear un nuevo evento.',
              life: 3000,
            });
          },
        });
      },
      error: (err: any) => {
        this.messageService.clear();
        let errorMessage = 'No se pudo crear el evento. Intenta nuevamente.';
        if (err?.error?.message) {
          errorMessage = err.error.message;
        } else if (err?.message) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error al crear evento',
          detail: errorMessage,
          life: 7000,
        });
      },
    });
  }
}
