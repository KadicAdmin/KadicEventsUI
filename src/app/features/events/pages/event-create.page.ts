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

interface modality {
  name: string;
  code: string;
}

interface Event {
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
  // private fb = inject(FormBuilder);

  // myForm = this.fb.group({
  //   eventName: ['', [Validators.required, Validators.minLength(3)]],
  //   eventType: ['', Validators.required],
  //   eventModality: ['', Validators.required],
  // });

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   type: new FormControl(''),
  //   modality: new FormControl(''),
  //   address: new FormControl(''),
  // });

  /// Declaramos el form sin inicializar
  myForm!: FormGroup;

  constructor() {
    // Aquí sí hay contexto de inyector
    const fb = inject(FormBuilder);

    effect(() => {
      // Se ejecuta cuando el componente ya está dentro del inyector
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

  event = signal<Event>({
    name: '',
    type: '',
    modality: '',
    startDate: null,
    link: '',
    address: '',
    image: null,
  });

  modalities = signal<modality[]>([
    { name: 'Online', code: 'On' },
    { name: 'Offline', code: 'Off' },
  ]);

  datetime12h: Date[] | undefined;

  onUpload(event: FileUploadEvent) {
    console.log(event.files); // aquí tienes los archivos
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
