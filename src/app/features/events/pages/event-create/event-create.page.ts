import { EventService } from '../../services/event.service';
import { EventRequestDto, EventResp } from '../../models/events.interfaces';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EventCreateTemplateComponent } from '../../components/templates/event-create-template/event-create-template';
import { EventModalityService } from '../../services/event.modality.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { extractData, extractDataSafe } from '@core/utils/api-response.utils';
import { EventModality, Modality } from '@core/models';

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
  readonly modalities = toSignal(
    this.$modalities.pipe(extractData()),
    { initialValue: [] as EventModality[] }
  );



  readonly eventTypes = signal<{ name: string; id: number }[]>([
    { name: 'Conference', id: 1 },
    { name: 'Workshop', id: 2 },
    { name: 'Seminar', id: 3 },
    { name: 'Webinar', id: 4 },
    { name: 'Meeting', id: 5 },
  ]);

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

  // readonly categories = signal<{ name: string; id: number }[]>([
  //   { name: 'Tecnología', id: 1 },
  //   { name: 'Educación', id: 2 },
  //   { name: 'Negocios', id: 3 },
  //   { name: 'Salud', id: 4 },
  //   { name: 'Arte y Cultura', id: 5 },
  //   { name: 'Deportes', id: 6 },
  //   { name: 'Ciencia', id: 7 },
  //   { name: 'Entretenimiento', id: 8 },
  // ]);

  readonly tags = signal<{ name: string; id: number }[]>([
    { name: 'Angular', id: 1 },
    { name: 'React', id: 2 },
    { name: 'Vue.js', id: 3 },
    { name: 'Node.js', id: 4 },
    { name: 'Python', id: 5 },
    { name: 'JavaScript', id: 6 },
    { name: 'TypeScript', id: 7 },
    { name: 'Machine Learning', id: 8 },
    { name: 'AI', id: 9 },
    { name: 'Blockchain', id: 10 },
    { name: 'Cloud Computing', id: 11 },
    { name: 'DevOps', id: 12 },
    { name: 'Frontend', id: 13 },
    { name: 'Backend', id: 14 },
    { name: 'Mobile', id: 15 },
  ]);

  constructor() {
    this.initializeForm();
    this.setupRealtimeValidation();
    this.loadModalities();
  }
  loadModalities() {
    console.log('Loading modalities...', this.modalities());
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

  // Event Date methods
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
    console.log('Creating new event date:', newEventDate.value);
    eventDates.push(newEventDate);
    console.log('All event dates:', eventDates.value);
  }

  removeEventDate(index: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    eventDates.removeAt(index);
  }

  getEventDateLocation(eventDateIndex: number): FormGroup | null {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const location = eventDate.get('location') as FormGroup;
    console.log(
      `Getting location for event date ${eventDateIndex}:`,
      location?.value
    );
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

  editLocation(eventDateIndex: number): void {
    console.log('Edit location for event date:', eventDateIndex);
  }

  clearLocation(eventDateIndex: number): void {
    const eventDates = this.myForm.get('eventDates') as FormArray;
    const eventDate = eventDates.at(eventDateIndex) as FormGroup;
    const location = eventDate.get('location') as FormGroup;
    location.reset();
  }

  // Speaker methods
  private createSpeakerGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      bio: [''],
      profileImageUrl: [''],
      linkedInUrl: [''],
      twitterUrl: [''],
      websiteUrl: [''],
      academicTitleId: [null],
      academicLevelId: [null],
      studyAreaId: [null],
      educationalInstitutionId: [null],
    });
  }

  addSpeakerToEventDate(eventDateIndex: number): void {
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

  // Talk methods
  private createTalkGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      duration: [null, Validators.required],
      imageUrl: [''],
      speakerId: [null],
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
      date: 'La fecha es requerida',
      title: 'El título es requerido',
    };

    return messages[fieldName] || 'Este campo es requerido';
  }

  getFormLevelErrors(): string[] {
    const errors: string[] = [];

    // Validar que haya al menos una fecha de evento
    const eventDates = this.myForm.get('eventDates') as FormArray;
    if (eventDates.length === 0) {
      errors.push('Debes agregar al menos una fecha para el evento');
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
      console.log(
        'Archivo guardado en el formulario:',
        this.myForm.get('mainImage')?.value
      );
    }
  }

  onFileRemove(event: any) {
    this.myForm.patchValue({ mainImage: null });
  }

  onImagesChange(images: any[]) {
    console.log('Images changed:', images);
    this.myForm.patchValue({ images: images });
  }

  onMainImageChange(mainImage: any) {
    console.log('Main image changed:', mainImage);
    this.myForm.patchValue({ mainImage: mainImage?.file || null });
  }

  // Submit
  onSubmit() {
    console.log('onSubmit called');
    console.log('Form valid:', this.myForm.valid);
    console.log('Form value:', this.myForm.value);
    console.log('Form errors:', this.getFormErrors());

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

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

    // TODO: Build the new event request with the new structure
    const formValue = this.myForm.value;
    console.log('Form data to send:', formValue);

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Evento creado correctamente (pendiente integración backend)',
      life: 3000,
    });

    // Uncomment when backend is ready
    // this.eventService.create(eventRequest).subscribe({
    //   next: (res: EventResp) => {
    //     console.log('Respuesta del servidor:', res);
    //     this.messageService.clear();
    //     this.myForm.reset();
    //     this.confirmationService.confirm({
    //       message: '¡El evento se ha creado exitosamente! ¿Deseas ir a la lista de eventos?',
    //       header: '✅ Evento Creado',
    //       icon: 'pi pi-check-circle',
    //       acceptIcon: 'pi pi-check',
    //       rejectIcon: 'pi pi-times',
    //       acceptLabel: 'Ver Eventos',
    //       rejectLabel: 'Crear Otro',
    //       acceptButtonStyleClass: 'p-button-success',
    //       rejectButtonStyleClass: 'p-button-secondary',
    //       accept: () => {
    //         this.router.navigate(['/events']);
    //       },
    //       reject: () => {
    //         this.messageService.add({
    //           severity: 'info',
    //           summary: 'Listo para otro evento',
    //           detail: 'Puedes crear un nuevo evento.',
    //           life: 3000,
    //         });
    //       },
    //     });
    //   },
    //   error: (err: any) => {
    //     console.error('Error creando evento:', err);
    //     this.messageService.clear();
    //     let errorMessage = 'No se pudo crear el evento. Intenta nuevamente.';
    //     if (err?.error?.message) {
    //       errorMessage = err.error.message;
    //     } else if (err?.message) {
    //       errorMessage = err.message;
    //     } else if (typeof err === 'string') {
    //       errorMessage = err;
    //     }
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error al crear evento',
    //       detail: errorMessage,
    //       life: 7000,
    //     });
    //   },
    // });
  }
}
