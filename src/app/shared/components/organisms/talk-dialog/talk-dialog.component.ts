import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ImageGalleryUploadComponent } from '@shared/components/molecules/image-gallery-upload';

@Component({
  selector: 'app-talk-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ImageGalleryUploadComponent,
  ],
  template: `
    <p-dialog [visible]="visible()" (visibleChange)="onVisibleChange.emit($event)" [modal]="true" [style]="{width: '500px'}" [draggable]="false"
      [resizable]="false" styleClass="rounded-2xl">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
            <i class="pi pi-microphone text-xl text-pink-600"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ isEditing() ? 'Editar' : 'Nueva' }} Charla
            </h3>
            <p class="text-sm text-gray-500">Detalles de la presentación</p>
          </div>
        </div>
      </ng-template>

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
          <textarea pInputTextarea formControlName="description" class="w-full" rows="3" 
            placeholder="Describe el contenido de la charla..."></textarea>
        </div>

        <!-- Duración -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Duración (minutos)</label>
          <input pInputText type="number" formControlName="duration" class="w-full" 
            placeholder="60" min="1" />
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
  `,
})
export class TalkDialogComponent {
  readonly visible = input.required<boolean>();
  readonly isEditing = input<boolean>(false);
  readonly talkForm = input<FormGroup>();
  readonly imagePreview = input<string>();

  readonly onSave = output<void>();
  readonly onCancel = output<void>();
  readonly onImageSelect = output<any>();
  readonly onVisibleChange = output<boolean>();

  previewUrl = signal<string | null>(null);

  handleImageChange(image: any) {
    if (image) {
      this.previewUrl.set(image.url);
      this.onImageSelect.emit({ files: [image.file] });
    } else {
      this.previewUrl.set(null);
    }
  }
}

