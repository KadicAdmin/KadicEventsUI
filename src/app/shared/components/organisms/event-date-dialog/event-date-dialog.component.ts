import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { LocationCardComponent } from '@shared/components/molecules/location-card';
import { EmptyStateComponent } from '@shared/components/atoms/empty-state';
import { LocationDialogComponent } from '@shared/components/organisms/location-dialog';
import { ImageGalleryUploadComponent } from '@shared/components/molecules/image-gallery-upload';
import { ModalComponent, ModalConfig } from '@shared/components/atoms/modal/modal.component';
import { Modality } from '@core/models';

@Component({
  selector: 'app-event-date-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePicker,
    CheckboxModule,
    TabsModule,
    ButtonModule,
    LocationCardComponent,
    EmptyStateComponent,
    LocationDialogComponent,
    ImageGalleryUploadComponent,
    ModalComponent,
  ],
  template: `
    <app-modal 
      [visible]="visible()" 
      [config]="modalConfig()"
      [showFooter]="true"
      [cancelLabel]="'Cancelar'"
      [saveLabel]="'Guardar'"
      (onVisibleChange)="onVisibleChange.emit($event)"
      (onCancel)="onCancel.emit()"
      (onSave)="onSave.emit()">
      
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
            <textarea pInputTextarea formControlName="description" rows="3" 
              placeholder="Describe las actividades de este día..."></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Imagen del Día</label>
            <app-image-gallery-upload
              [allowMultiple]="false"
              (onMainImageChange)="handleImageChange($event)"
            />
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

      <!-- Location Dialog -->
      <app-location-dialog
        [visible]="showLocationDialog()"
        [isEditing]="false"
        [locationForm]="getCurrentLocationForm()"
        (onSave)="saveLocation()"
        (onCancel)="showLocationDialog.set(false)"
      />
    </app-modal>
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
  previewUrl = signal<string | null>(null);

  // Configuración del modal que se actualiza según el modo de edición
  modalConfig = computed<ModalConfig>(() => ({
    title: this.isEditing() ? 'Editar Fecha del Evento' : 'Nueva Fecha del Evento',
    subtitle: 'Completa los detalles de esta fecha',
    icon: 'pi pi-calendar',
    iconBgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    width: '700px',
    draggable: false,
    resizable: false,
    closable: true,
    modal: true,
    styleClass: 'rounded-2xl'
  }));

  openLocationDialog() {
    this.showLocationDialog.set(true);
  }

  saveLocation() {
    this.showLocationDialog.set(false);
  }

  getCurrentLocationForm(): FormGroup | undefined {
    return this.location();
  }

  handleImageChange(image: any) {
    if (image) {
      this.previewUrl.set(image.url);
      this.eventDateForm()?.patchValue({ mainImage: image.file });
    } else {
      this.previewUrl.set(null);
      this.eventDateForm()?.patchValue({ mainImage: null });
    }
  }
}