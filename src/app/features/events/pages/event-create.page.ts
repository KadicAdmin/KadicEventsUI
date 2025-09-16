import { EventService } from '../services/event.service';
import { EventRequestDto, EventResp } from '../models/events.interfaces';
import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePicker } from 'primeng/datepicker';
import { Message } from 'primeng/message';

interface Modality {
  name: string;
  code: 'On' | 'Off';
  id: number;
}

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [
    CommonModule,
    StepperModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    Select,
    FileUpload,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DatePicker,
    Message,
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

  readonly modalities = signal<Modality[]>([
    { name: 'Online', code: 'On', id: 1 },
    { name: 'Offline', code: 'Off', id: 2 },
  ]);

  readonly eventTypes = signal<{ name: string; id: number }[]>([
    { name: 'Conference', id: 1 },
    { name: 'Workshop', id: 2 },
    { name: 'Seminar', id: 3 },
    { name: 'Webinar', id: 4 },
    { name: 'Meeting', id: 5 },
  ]);

  constructor() {
    this.myForm = this.fb.group(
      {
        eventName: ['', Validators.required],
        eventTypeId: [null, Validators.required],
        modality: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        eventLink: [''],
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        postalCode: [''],
        image: [null],
        imageCaption: [''],
        imageIsMain: [true],
      },
      { validators: [this.dateRangeValidator] }
    );

    this.myForm.get('modality')!.valueChanges.subscribe((modalityId: number | null) => {
      const linkCtrl = this.myForm.get('eventLink')!;
      const isOnline = modalityId === this.modalities().find(m => m.code === 'On')?.id;
      if (isOnline) {
        linkCtrl.addValidators([Validators.required]);
      } else {
        linkCtrl.clearValidators();
        linkCtrl.setValue('');
      }
      linkCtrl.updateValueAndValidity({ emitEvent: false });
    });

    this.setupRealtimeValidation();
  }

  private setupRealtimeValidation(): void {
    const fieldsToValidate = [
      'eventName',
      'eventTypeId',
      'modality',
      'startDate',
      'endDate',
      'eventLink',
      'addressLine1'
    ];

    fieldsToValidate.forEach(fieldName => {
      const control = this.myForm.get(fieldName);
      if (control) {
        control.valueChanges.subscribe(() => {
          if (control.dirty && !control.touched) {
            control.markAsTouched();
          }
        });
      }
    });

    this.myForm.get('startDate')?.valueChanges.subscribe(() => {
      this.myForm.updateValueAndValidity({ emitEvent: false });
    });

    this.myForm.get('endDate')?.valueChanges.subscribe(() => {
      this.myForm.updateValueAndValidity({ emitEvent: false });
    });
  }

  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value as Date | null;
    const end = group.get('endDate')?.value as Date | null;

    if (!start || !end) return null;

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate >= endDate) {
      return {
        dateRange: {
          message: 'La fecha de inicio debe ser anterior a la fecha de fin',
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString()
        }
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return {
        dateRange: {
          message: 'La fecha de inicio no puede ser en el pasado',
          startDate: startDate.toLocaleDateString()
        }
      };
    }

    return null;
  }

  private getFormErrors(): any {
    let formErrors: any = {};

    Object.keys(this.myForm.controls).forEach(key => {
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
      eventName: 'El nombre del evento es requerido',
      eventTypeId: 'Selecciona un tipo de evento',
      modality: 'Selecciona una modalidad',
      startDate: 'La fecha de inicio es requerida',
      endDate: 'La fecha de fin es requerida',
      eventLink: 'El enlace de la plataforma virtual es requerido',
      addressLine1: 'La dirección es requerida',
    };

    return messages[fieldName] || 'Este campo es requerido';
  }

  getFormLevelErrors(): string[] {
    const errors: string[] = [];

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

  onUpload(ev: FileUploadEvent) {
    const file = ev.files?.[0];
    if (file) {
      this.myForm.patchValue({ image: file });
    }
  }

  onFileSelect(event: any) {
    const file = event.files?.[0];
    console.log('Archivo seleccionado:', file);
    if (file) {
      this.myForm.patchValue({ image: file });
      console.log('Archivo guardado en el formulario:', this.myForm.get('image')?.value);
    }
  }

  onFileRemove(event: any) {
    console.log('Archivo removido');
    this.myForm.patchValue({ image: null });
  }

  private buildEventRequest(): EventRequestDto {
    const v = this.myForm.value;

    const eventRequest: EventRequestDto = {
      Name: String(v.eventName),
      EventTypeId: Number(v.eventTypeId ?? 0),
      ModalityId: Number(v.modality ?? 0),
      VirtualPlatformLink: v.eventLink ?? null,
      StartDate: v.startDate instanceof Date ? v.startDate.toISOString() : new Date(v.startDate!).toISOString(),
      EndDate: v.endDate instanceof Date ? v.endDate.toISOString() : new Date(v.endDate!).toISOString(),
      AddressesNew: [
        {
          Line1: v.addressLine1 ?? '',
          Line2: v.addressLine2 ?? null,
          CityId: 1,
        }
      ],
      AddressesToDelete: [],
      ImagesNew: [],
      ImagesToDelete: [],
    };

    if (v.image) {
      console.log('Agregando imagen al request:', v.image);
      eventRequest.ImagesNew.push({
        File: v.image as File,
        Caption: v.imageCaption || 'Event Image',
        IsMain: !!v.imageIsMain,
      });
    } else {
      console.log('No hay imagen para agregar');
    }

    console.log('EventRequest final:', eventRequest);
    return eventRequest;
  }

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
        life: 5000
      });
      return;
    }

    const eventRequest = this.buildEventRequest();
    console.log('Datos a enviar:', eventRequest);

    this.messageService.add({
      severity: 'info',
      summary: 'Procesando...',
      detail: 'Creando el evento, por favor espera.',
      life: 3000
    });

    this.eventService.create(eventRequest).subscribe({
      next: (res: EventResp) => {
        console.log('Respuesta del servidor:', res);

        this.messageService.clear();

        this.myForm.reset({
          imageIsMain: true,
        });

        this.confirmationService.confirm({
          message: '¡El evento se ha creado exitosamente! ¿Deseas ir a la lista de eventos?',
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
              life: 3000
            });
          }
        });
      },
      error: (err: any) => {
        console.error('Error creando evento:', err);

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
          life: 7000
        });
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }
}
