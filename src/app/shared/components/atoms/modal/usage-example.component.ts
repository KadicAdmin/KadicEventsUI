import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SpeakerDialogRefactoredComponent } from '@shared/components/organisms/speaker-dialog/speaker-dialog-refactored.component';
import { TalkDialogRefactoredComponent } from '@shared/components/organisms/talk-dialog/talk-dialog-refactored.component';
import { EventDateDialogRefactoredComponent } from '@shared/components/organisms/event-date-dialog/event-date-dialog-refactored.component';

@Component({
    selector: 'app-modal-usage-example',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        SpeakerDialogRefactoredComponent,
        TalkDialogRefactoredComponent,
        EventDateDialogRefactoredComponent,
    ],
    template: `
    <div class="p-6 space-y-4">
      <h2 class="text-2xl font-bold mb-6">Ejemplo de Uso de Modales Refactorizados</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Speaker Dialog -->
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">Speaker Dialog</h3>
          <p class="text-sm text-gray-600 mb-4">Modal refactorizado para speakers</p>
          <p-button 
            label="Abrir Speaker Dialog" 
            (onClick)="openSpeakerDialog()" 
            icon="pi pi-user" />
        </div>

        <!-- Talk Dialog -->
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">Talk Dialog</h3>
          <p class="text-sm text-gray-600 mb-4">Modal refactorizado para charlas</p>
          <p-button 
            label="Abrir Talk Dialog" 
            (onClick)="openTalkDialog()" 
            icon="pi pi-microphone" />
        </div>

        <!-- Event Date Dialog -->
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">Event Date Dialog</h3>
          <p class="text-sm text-gray-600 mb-4">Modal refactorizado para fechas</p>
          <p-button 
            label="Abrir Event Date Dialog" 
            (onClick)="openEventDateDialog()" 
            icon="pi pi-calendar" />
        </div>
      </div>

      <!-- Modales -->
      <app-speaker-dialog-refactored
        [visible]="showSpeakerDialog()"
        [isEditing]="false"
        [speakerForm]="speakerForm()"
        [academicTitles]="[]"
        [academicLevels]="[]"
        [studyAreas]="[]"
        [educationalInstitutions]="[]"
        (onVisibleChange)="onSpeakerVisibleChange($event)"
        (onCancel)="closeSpeakerDialog()"
        (onSave)="saveSpeaker()" />

      <app-talk-dialog-refactored
        [visible]="showTalkDialog()"
        [isEditing]="false"
        [talkForm]="talkForm()"
        (onVisibleChange)="onTalkVisibleChange($event)"
        (onCancel)="closeTalkDialog()"
        (onSave)="saveTalk()" />

      <app-event-date-dialog-refactored
        [visible]="showEventDateDialog()"
        [isEditing]="false"
        [eventDateForm]="eventDateForm()"
        [modalities]="modalities()"
        [location]="undefined"
        (onVisibleChange)="onEventDateVisibleChange($event)"
        (onCancel)="closeEventDateDialog()"
        (onSave)="saveEventDate()" />
    </div>
  `,
})
export class ModalUsageExampleComponent {
    private fb = new FormBuilder();

    // Estados de los modales
    showSpeakerDialog = signal(false);
    showTalkDialog = signal(false);
    showEventDateDialog = signal(false);

    // Formularios
    speakerForm = signal<FormGroup | undefined>(undefined);
    talkForm = signal<FormGroup | undefined>(undefined);
    eventDateForm = signal<FormGroup | undefined>(undefined);

    // Datos mock
    modalities = signal([
        { name: 'Online', code: 'On' as const, id: 1 },
        { name: 'Presencial', code: 'Off' as const, id: 2 },
    ]);

    constructor() {
        this.initializeForms();
    }

    private initializeForms() {
        this.speakerForm.set(this.fb.group({
            firstName: [''],
            lastName: [''],
            email: [''],
            phoneNumber: [''],
            bio: [''],
            academicTitleId: [null],
            academicLevelId: [null],
            studyAreaId: [null],
            educationalInstitutionId: [null],
            linkedInUrl: [''],
            twitterUrl: [''],
            websiteUrl: ['']
        }));

        this.talkForm.set(this.fb.group({
            title: [''],
            description: [''],
            duration: [60],
            imageUrl: ['']
        }));

        this.eventDateForm.set(this.fb.group({
            date: [null],
            title: [''],
            description: [''],
            modalities: [[]],
            mainImage: [null]
        }));
    }

    // Métodos para abrir modales
    openSpeakerDialog() {
        this.showSpeakerDialog.set(true);
    }

    openTalkDialog() {
        this.showTalkDialog.set(true);
    }

    openEventDateDialog() {
        this.showEventDateDialog.set(true);
    }

    // Métodos para cerrar modales
    closeSpeakerDialog() {
        this.showSpeakerDialog.set(false);
    }

    closeTalkDialog() {
        this.showTalkDialog.set(false);
    }

    closeEventDateDialog() {
        this.showEventDateDialog.set(false);
    }

    // Métodos para guardar
    saveSpeaker() {
        console.log('Guardando speaker:', this.speakerForm()?.value);
        this.closeSpeakerDialog();
    }

    saveTalk() {
        console.log('Guardando talk:', this.talkForm()?.value);
        this.closeTalkDialog();
    }

    saveEventDate() {
        console.log('Guardando event date:', this.eventDateForm()?.value);
        this.closeEventDateDialog();
    }

    // Métodos para manejar cambios de visibilidad
    onSpeakerVisibleChange(visible: boolean) {
        this.showSpeakerDialog.set(visible);
    }

    onTalkVisibleChange(visible: boolean) {
        this.showTalkDialog.set(visible);
    }

    onEventDateVisibleChange(visible: boolean) {
        this.showEventDateDialog.set(visible);
    }
}
