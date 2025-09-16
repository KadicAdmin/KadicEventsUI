import { EventService } from '../services/event.service';
import { EventRequestDto, EventResp } from '../models/events.interfaces';
import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DatePicker } from 'primeng/datepicker';

interface Modality {
  name: string;
  code: 'On' | 'Off';
  id: number; // Mapea al ModalityId del backend
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
    ReactiveFormsModule,
    DatePicker,
  ],
  templateUrl: './event-create.page.html',
  providers: [MessageService],
})
export class EventCreatePage {
  myForm!: FormGroup;
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private messageService = inject(MessageService);

  // Modalidades disponibles (ajusta los IDs según tu catálogo)
  readonly modalities = signal<Modality[]>([
    { name: 'Online', code: 'On', id: 1 },
    { name: 'Offline', code: 'Off', id: 2 },
  ]);

  // Tipos de eventos disponibles (ajusta los IDs según tu catálogo)
  readonly eventTypes = signal<{ name: string; id: number }[]>([
    { name: 'Conference', id: 1 },
    { name: 'Workshop', id: 2 },
    { name: 'Seminar', id: 3 },
    { name: 'Webinar', id: 4 },
    { name: 'Meeting', id: 5 },
  ]);

  // ====== Inicialización del formulario ======
  constructor() {
    this.myForm = this.fb.group(
      {
        // UI fields
        eventName: ['', Validators.required],
        eventTypeId: [null, Validators.required], // <- usa un select/number real
        modality: [null, Validators.required],    // guardará el id numérico de la modalidad
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        eventLink: [''], // se vuelve requerido si modalidad === Online
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        postalCode: [''],

        // archivo único (si quieres múltiples, cambia a arreglo)
        image: [null], // File
        imageCaption: [''],
        imageIsMain: [true],
      },
      { validators: [this.dateRangeValidator] }
    );

    // Requerir eventLink solo cuando modalidad sea Online (id de Online)
    this.myForm.get('modality')!.valueChanges.subscribe((modalityId: number | null) => {
      const linkCtrl = this.myForm.get('eventLink')!;
      const isOnline = modalityId === this.modalities().find(m => m.code === 'On')?.id;
      if (isOnline) {
        linkCtrl.addValidators([Validators.required]);
      } else {
        linkCtrl.clearValidators();
        linkCtrl.setValue(''); // opcional: limpia el link cuando es offline
      }
      linkCtrl.updateValueAndValidity({ emitEvent: false });
    });
  }

  // ====== Validadores ======
  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value as Date | null;
    const end = group.get('endDate')?.value as Date | null;
    if (!start || !end) return null;
    return start < end ? null : { dateRange: 'StartDate must be before EndDate' };
  }

  // ====== Carga de archivo ======
  onUpload(ev: FileUploadEvent) {
    const file = ev.files?.[0];
    if (file) {
      this.myForm.patchValue({ image: file });
    }
  }

  // ====== Builder de EventRequestDto ======
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
          CityId: 1, // TODO: Necesitas obtener el CityId real desde un selector o campo
        }
      ],
      AddressesToDelete: [], // Para nuevos eventos, no hay addresses que eliminar
      ImagesNew: [],
      ImagesToDelete: [], // Para nuevos eventos, no hay imágenes que eliminar
    };

    // Agregar imagen si existe
    if (v.image) {
      eventRequest.ImagesNew.push({
        File: v.image as File,
        Caption: v.imageCaption ?? null,
        IsMain: !!v.imageIsMain,
      });
    }

    return eventRequest;
  }

  // ====== Submit ======
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario incompleto',
        detail: 'Revisa los campos requeridos.',
      });
      return;
    }

    const eventRequest = this.buildEventRequest();
    console.log('Datos a enviar:', eventRequest);

    this.eventService.create(eventRequest).subscribe({
      next: (res: EventResp) => {
        console.log('Respuesta del servidor:', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Evento creado correctamente.',
        });
        // Opcional: reset limpia también el FileUpload si lo referencias por @ViewChild
        this.myForm.reset({
          imageIsMain: true,
        });
      },
      error: (err: any) => {
        console.error('Error creando evento:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el evento.',
        });
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }
}
