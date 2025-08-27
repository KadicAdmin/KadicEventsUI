import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

interface modality {
  name: string;
  code: string;
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
  ],

  templateUrl: './event-create.page.html',
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
  };
  
  
}
