// 
import { EventService } from '../../../core/services/event.service';
import { Component, effect, signal, inject } from '@angular/core';
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
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FileUploadEvent } from 'primeng/fileupload';
import { DatePicker } from 'primeng/datepicker';

interface Modality {
  name: string;
  code: string;
}

interface EventModel {
  name: string;
  type: string;
  modality: string;
  startDate: Date | null;
  link: string;
  address: string;
  image: File | null;
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
  private eventService = inject(EventService);

  event = signal<EventModel>({
    name: '',
    type: '',
    modality: '',
    startDate: null,
    link: '',
    address: '',
    image: null,
  });

  modalities = signal<Modality[]>([
    { name: 'Online', code: 'On' },
    { name: 'Offline', code: 'Off' },
  ]);

  constructor() {
    const fb = inject(FormBuilder);

    effect(() => {
      this.myForm = fb.group({
        eventName: ['', Validators.required],
        eventType: ['', Validators.required],
        modality: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        eventLink: ['', Validators.required],
        address: ['', Validators.required],
        postalCode: [''],
        image: [null],
      });
    });
  }

  onUpload(event: FileUploadEvent) {
    const file = event.files[0];
    this.myForm.patchValue({ image: file });
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // FormData para enviar datos + imagen
    const formData = new FormData();
    formData.append('name', this.myForm.value.eventName);
    formData.append('modalityId', this.myForm.value.modality);
    formData.append('startDate', this.myForm.value.startDate.toISOString());
    formData.append('endDate', this.myForm.value.endDate.toISOString());
    formData.append('addresses', this.myForm.value.address);
    formData.append('eventTypeId', '0');

    if (this.myForm.value.image) {
      formData.append('image', this.myForm.value.image);
    }

    this.eventService.create(formData).subscribe({
      next: (res) => {
        console.log('Evento creado:', res);
      },
      error: (err) => {
        console.error('Error creando evento:', err);
      },
    });
  }
}
