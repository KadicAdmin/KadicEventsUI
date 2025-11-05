import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EventCreateTemplateComponent } from '../../components/templates/event-create-template/event-create-template';
import { Speaker, CreateEventRequest } from '@core/models';
import { EventResp } from '../../models/events.interfaces';
import { EventService } from '../../services/event.service';
import { EventStateService } from '../../services/event-state.service';
import { EventFormBuilderService } from '../../services/event-form-builder.service';
import { EventFormValidatorService } from '../../services/event-form-validator.service';
import { EventPayloadTransformerService } from '../../services/event-payload-transformer.service';
import { EventSpeakerHandlerService } from '../../services/event-speaker-handler.service';

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
  providers: [
    MessageService,
    ConfirmationService,
    EventStateService,
    EventFormBuilderService,
    EventFormValidatorService,
    EventPayloadTransformerService,
    EventSpeakerHandlerService,
  ],
})
export class EventCreatePage {
  // Servicios inyectados
  private eventService = inject(EventService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  // Servicios especializados
  readonly stateService = inject(EventStateService);
  private formBuilder = inject(EventFormBuilderService);
  private validator = inject(EventFormValidatorService);
  private payloadTransformer = inject(EventPayloadTransformerService);
  private speakerHandler = inject(EventSpeakerHandlerService);

  // Formulario principal
  myForm!: FormGroup;

  // Acceso a datos del estado (para el template)
  readonly modalities = this.stateService.modalities;
  readonly eventTypes = this.stateService.eventTypes;
  readonly tags = this.stateService.tags;
  readonly categories = this.stateService.categories;
  readonly speakers = this.stateService.speakers;
  readonly academicDegrees = this.stateService.academicDegrees;
  readonly academicLevels = this.stateService.academicLevels;
  readonly studyAreas = this.stateService.studyAreas;
  readonly educationalInstitutions = this.stateService.educationalInstitutions;

  constructor() {
    this.initializeForm();
    this.validator.setupRealtimeValidation(this.myForm);
  }

  private initializeForm(): void {
    this.myForm = this.formBuilder.createEventForm();
  }

  // ========== FormArray Getters (delegados al FormBuilder) ==========

  get eventDatesArray(): any[] {
    return this.formBuilder.getEventDatesControls(this.myForm);
  }

  getSpeakersForEventDate(eventDateIndex: number): any[] {
    return this.formBuilder.getSpeakersControls(this.myForm, eventDateIndex);
  }

  getTalksForEventDate(eventDateIndex: number): any[] {
    return this.formBuilder.getTalksControls(this.myForm, eventDateIndex);
  }

  getEventDateLocation(eventDateIndex: number): FormGroup | null {
    return this.formBuilder.getLocationGroup(this.myForm, eventDateIndex);
  }

  // ========== Event Date Management ==========

  addEventDate(): void {
    this.formBuilder.addEventDate(this.myForm);
  }

  removeEventDate(index: number): void {
    this.formBuilder.removeEventDate(this.myForm, index);
  }

  editLocation(eventDateIndex: number): void {
    // TODO: Implementar lógica para editar ubicación
    console.log('Edit location for event date index:', eventDateIndex);
  }

  clearLocation(eventDateIndex: number): void {
    this.formBuilder.clearLocation(this.myForm, eventDateIndex);
  }

  // ========== Speaker Management ==========

  addEmptySpeakerToEventDate(eventDateIndex: number): void {
    this.formBuilder.addSpeakerToEventDate(this.myForm, eventDateIndex);
  }

  removeSpeakerFromEventDate(
    eventDateIndex: number,
    speakerIndex: number
  ): void {
    this.formBuilder.removeSpeakerFromEventDate(
      this.myForm,
      eventDateIndex,
      speakerIndex
    );
  }

  onCreateSpeaker(data: { speakerData: any; eventDateIndex: number }): void {
    const { speakerData, eventDateIndex } = data;
    this.speakerHandler.createSpeaker(speakerData, eventDateIndex, this.myForm);
  }

  onUpdateSpeaker(data: {
    speaker: Speaker;
    eventDateIndex: number;
    speakerIndex: number;
  }): void {
    const { speaker, eventDateIndex, speakerIndex } = data;
    this.speakerHandler.updateSpeaker(
      speaker,
      eventDateIndex,
      speakerIndex,
      this.myForm
    );
  }

  onSelectExistingSpeaker(data: {
    speaker: Speaker;
    eventDateIndex: number;
  }): void {
    const { speaker, eventDateIndex } = data;
    this.speakerHandler.addExistingSpeaker(
      speaker,
      eventDateIndex,
      this.myForm
    );
  }

  // ========== Talk Management ==========

  addTalkToEventDate(eventDateIndex: number): void {
    this.formBuilder.addTalkToEventDate(this.myForm, eventDateIndex);
  }

  removeTalkFromEventDate(eventDateIndex: number, talkIndex: number): void {
    this.formBuilder.removeTalkFromEventDate(
      this.myForm,
      eventDateIndex,
      talkIndex
    );
  }

  // ========== Validation Methods (delegados al Validator) ==========

  isFieldInvalid(fieldName: string): boolean {
    return this.validator.isFieldInvalid(this.myForm, fieldName);
  }

  getFieldErrorMessage(fieldName: string): string {
    return this.validator.getFieldErrorMessage(this.myForm, fieldName);
  }

  getFormLevelErrors(): string[] {
    return this.validator.getFormLevelErrors(this.myForm);
  }

  hasFormLevelErrors(): boolean {
    return this.validator.hasFormLevelErrors(this.myForm);
  }

  logAllFormErrors(): void {
    this.validator.logAllFormErrors(this.myForm);
  }

  // ========== File Upload Methods ==========

  onUpload(ev: FileUploadEvent): void {
    const file = ev.files?.[0];
    if (file) {
      this.myForm.patchValue({ mainImage: file });
    }
  }

  onFileSelect(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.myForm.patchValue({ mainImage: file });
    }
  }

  onFileRemove(event: any): void {
    this.myForm.patchValue({ mainImage: null });
  }

  onImagesChange(images: any[]): void {
    this.myForm.patchValue({ images: images });
  }

  onMainImageChange(mainImage: any): void {
    this.myForm.patchValue({ mainImage: mainImage?.file || null });
  }

  // ========== Submit ==========

  async onSubmit(): Promise<void> {
    // Validar formulario
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.logAllFormErrors();

      const errorMessage = this.validator.getValidationErrorMessage(
        this.myForm
      );

      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario incompleto',
        detail: errorMessage,
        life: 5000,
      });
      return;
    }

    try {
      // Transformar datos del formulario al formato del API
      const eventRequest: CreateEventRequest =
        await this.payloadTransformer.buildEventPayload(this.myForm.value);

      // Enviar al servidor
      this.eventService.create(eventRequest).subscribe({
        next: (res: EventResp) => {
          this.handleSuccessResponse(res);
        },
        error: (err: any) => {
          this.handleErrorResponse(err);
        },
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al procesar',
        detail: 'Ocurrió un error al procesar los datos del formulario.',
        life: 5000,
      });
    }
  }

  /**
   * Maneja la respuesta exitosa de creación de evento
   */
  private handleSuccessResponse(res: EventResp): void {
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
  }

  /**
   * Maneja la respuesta de error al crear evento
   */
  private handleErrorResponse(err: any): void {
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
  }
}
