import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageGalleryUploadComponent } from '@shared/components/molecules/image-gallery-upload';
import { ModalComponent, ModalConfig } from '@shared/components/atoms/modal/modal.component';
import { Speaker } from '@core/models';

@Component({
  selector: 'app-talk-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
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
      
      @if (talkForm()) {
      <form [formGroup]="talkForm()!" class="space-y-6 pt-4">
        <!-- Imagen -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Imagen de la Charla</label>
          <app-image-gallery-upload
            [allowMultiple]="false"
            (onMainImageChange)="handleImageChange($event)"
          />
        </div>

        <!-- Título -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Título</label>
          <input pInputText formControlName="title" class="w-full" 
            placeholder="Ej: Introducción a Angular 19" />
        </div>

        <!-- Descripción -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Descripción</label>
          <textarea pInputTextarea formControlName="description" rows="3" 
            placeholder="Describe el contenido de la charla..."></textarea>
        </div>

        <!-- Horarios -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Hora Inicio</label>
            <input type="time" pInputText formControlName="startHour" class="w-full" 
              placeholder="08:00" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Hora Fin</label>
            <input type="time" pInputText formControlName="endHour" class="w-full" 
              placeholder="09:00" />
          </div>
        </div>

        <!-- Duración -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Duración (minutos)</label>
          <input pInputText type="number" formControlName="duration" class="w-full" 
            placeholder="60" min="1" />
        </div>

        <!-- Speakers -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Speakers</label>
          <p-multiSelect
            [options]="availableSpeakers()"
            optionLabel="name"
            optionValue="id"
            formControlName="speakers"
            class="w-full"
            placeholder="Selecciona speakers"
            [showToggleAll]="false"
            [showHeader]="false"
          >
            <ng-template let-speaker pTemplate="item">
              <div class="flex items-center gap-2">
                <span>{{ speaker.name }} {{ speaker.lastName }}</span>
              </div>
            </ng-template>
          </p-multiSelect>
        </div>
      </form>
      }
    </app-modal>
  `,
})
export class TalkDialogComponent {
  readonly visible = input.required<boolean>();
  readonly isEditing = input<boolean>(false);
  readonly talkForm = input<FormGroup>();
  readonly imagePreview = input<string>();
  readonly availableSpeakers = input<Speaker[]>([]);

  readonly onSave = output<void>();
  readonly onCancel = output<void>();
  readonly onImageSelect = output<any>();
  readonly onVisibleChange = output<boolean>();

  previewUrl = signal<string | null>(null);

  // Configuración del modal que se actualiza según el modo de edición
  modalConfig = computed<ModalConfig>(() => ({
    title: this.isEditing() ? 'Editar Charla' : 'Nueva Charla',
    subtitle: 'Detalles de la presentación',
    icon: 'pi pi-microphone',
    iconBgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    width: '600px',
    draggable: false,
    resizable: false,
    closable: true,
    modal: true,
    styleClass: 'rounded-2xl'
  }));

  handleImageChange(image: any) {
    if (image) {
      this.previewUrl.set(image.url);
      this.talkForm()?.patchValue({ imageUrl: image.file });
    } else {
      this.previewUrl.set(null);
      this.talkForm()?.patchValue({ imageUrl: null });
    }
  }
}