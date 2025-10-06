import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUpload } from 'primeng/fileupload';
import { TabsModule } from 'primeng/tabs';
import { LocationCardComponent } from '@shared/components/molecules/location-card';
import { EmptyStateComponent } from '@shared/components/atoms/empty-state';
import { LocationDialogComponent } from '@shared/components/organisms/location-dialog';

interface Modality {
  name: string;
  code: 'On' | 'Off';
  id: number;
}

@Component({
  selector: 'app-event-date-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DatePicker,
    CheckboxModule,
    FileUpload,
    TabsModule,
    LocationCardComponent,
    EmptyStateComponent,
    LocationDialogComponent,
  ],
  template: `
    <p-dialog [visible]="visible()" (visibleChange)="onVisibleChange.emit($event)" [modal]="true" [style]="{width: '700px'}" [draggable]="false"
      [resizable]="false" styleClass="rounded-2xl">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <i class="pi pi-calendar text-xl text-indigo-600"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ isEditing() ? 'Editar' : 'Nueva' }} Fecha del Evento
            </h3>
            <p class="text-sm text-gray-500">Completa los detalles de esta fecha</p>
          </div>
        </div>
      </ng-template>

      @if (eventDateForm()) {
      <form [formGroup]="eventDateForm()!" class="space-y-6 pt-4">
        <!-- Información Básica -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900">Información Básica</h4>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Fecha</label>
              <p-datepicker formControlName="date" class="w-full" placeholder="Selecciona la fecha" />
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Título</label>
              <input pInputText formControlName="title" class="w-full" placeholder="Ej: Día 1 - Conferencias" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Descripción</label>
            <textarea pInputTextarea formControlName="description" class="w-full" rows="3" 
              placeholder="Describe las actividades de este día..."></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Imagen del Día</label>
            <p-fileupload name="image" [multiple]="false" accept="image/*" maxFileSize="3000000" 
              mode="basic" [auto]="false" chooseLabel="Seleccionar Imagen" chooseIcon="pi pi-image" class="w-full">
            </p-fileupload>
          </div>
        </div>

        <!-- Modalidades -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900">Modalidades</h4>
          <div class="flex flex-wrap gap-3">
            @for (modality of modalities(); track modality.id) {
            <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <p-checkbox [value]="modality.id" formControlName="modalities" />
              <label class="text-sm text-gray-700">{{ modality.name }}</label>
            </div>
            }
          </div>
        </div>

        <!-- Ubicación -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-gray-900">Ubicación del Evento</h4>
            @if (location()?.get('name')?.value) {
            <p-button label="Cambiar" icon="pi pi-map-marker" size="small" [outlined]="true"
              (onClick)="openLocationDialog()" />
            }
          </div>
          
          @if (location()?.get('name')?.value) {
          <div class="space-y-3">
            <app-location-card
              [name]="location()?.get('name')?.value"
              [address]="location()?.get('address')?.value"
              [latitude]="location()?.get('latitude')?.value"
              [longitude]="location()?.get('longitude')?.value"
              (onDelete)="onClearLocation.emit()"
            />
          </div>
          } @else {
          <app-empty-state
            icon="pi-map-marker"
            message="No hay ubicación asignada"
            buttonLabel="Seleccionar Ubicación"
            (onButtonClick)="openLocationDialog()"
          />
          }
        </div>
      </form>
      }

      <ng-template pTemplate="footer">
        <div class="flex justify-end gap-2">
          <p-button label="Cancelar" (onClick)="onCancel.emit()" [outlined]="true" />
          <p-button label="Guardar" (onClick)="onSave.emit()" />
        </div>
      </ng-template>
    </p-dialog>

    <!-- Location Dialog -->
    <app-location-dialog
      [visible]="showLocationDialog()"
      [isEditing]="false"
      [locationForm]="getCurrentLocationForm()"
      (onSave)="saveLocation()"
      (onCancel)="showLocationDialog.set(false)"
    />
  `,
})
export class EventDateDialogComponent {
  readonly visible = input.required<boolean>();
  readonly isEditing = input<boolean>(false);
  readonly eventDateForm = input<FormGroup>();
  readonly modalities = input.required<Modality[]>();
  readonly location = input<FormGroup>();

  readonly onSave = output<void>();
  readonly onCancel = output<void>();
  readonly onClearLocation = output<void>();
  readonly onVisibleChange = output<boolean>();

  showLocationDialog = signal(false);

  openLocationDialog() {
    this.showLocationDialog.set(true);
  }

  saveLocation() {
    this.showLocationDialog.set(false);
  }

  getCurrentLocationForm(): FormGroup | undefined {
    return this.location();
  }
}

