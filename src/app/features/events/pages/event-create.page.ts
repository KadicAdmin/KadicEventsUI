import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Fluid } from 'primeng/fluid';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FileUploadEvent } from 'primeng/fileupload';

interface modality {
  name: string;
  code: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
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
    DatePicker,
    FileUpload,
    ToastModule,
  ],

  templateUrl: './event-create.page.html',
  providers: [MessageService],
})
export class EventCreatePage {
  modalities: modality[] | undefined;

  value3: modality | undefined;

  value: string | undefined;

  ngOnInit() {
    this.modalities = [
      { name: 'Online', code: 'On' },
      { name: 'Offline', code: 'Of' },
    ];
  }
  datetime12h: Date[] | undefined;

  onUpload(event: FileUploadEvent) {
    console.log(event.files); // aquí tienes los archivos
  }
}
