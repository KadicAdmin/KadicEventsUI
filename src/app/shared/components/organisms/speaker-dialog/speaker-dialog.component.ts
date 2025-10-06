import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-speaker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FileUpload,
    AvatarModule,
  ],
  template: `
    <p-dialog [visible]="visible()" (visibleChange)="onVisibleChange.emit($event)" [modal]="true" [style]="{width: '500px'}" [draggable]="false"
      [resizable]="false" styleClass="rounded-2xl">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <i class="pi pi-user text-xl text-purple-600"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ isEditing() ? 'Editar' : 'Nuevo' }} Speaker
            </h3>
            <p class="text-sm text-gray-500">Información del ponente</p>
          </div>
        </div>
      </ng-template>

      @if (speakerForm()) {
      <form [formGroup]="speakerForm()!" class="space-y-6 pt-4">
        <!-- Avatar Preview -->
        <div class="flex justify-center">
          <div class="relative">
            @if (imagePreview()) {
            <img [src]="imagePreview()" alt="Speaker" 
              class="w-24 h-24 rounded-full object-cover border-4 border-purple-100" />
            } @else {
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <i class="pi pi-user text-4xl text-purple-600"></i>
            </div>
            }
          </div>
        </div>

        <!-- Imagen -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Foto del Speaker</label>
          <p-fileupload name="image" (onSelect)="onImageSelect.emit($event)" [multiple]="false" 
            accept="image/*" maxFileSize="3000000" mode="basic" [auto]="false" 
            chooseLabel="Seleccionar Foto" chooseIcon="pi pi-camera" class="w-full">
          </p-fileupload>
        </div>

        <!-- Nombre -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Nombre</label>
            <input pInputText formControlName="firstName" class="w-full" placeholder="Juan" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Apellido</label>
            <input pInputText formControlName="lastName" class="w-full" placeholder="Pérez" />
          </div>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input pInputText type="email" formControlName="email" class="w-full" 
            placeholder="juan.perez@example.com" />
        </div>

        <!-- Biografía -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Biografía (Opcional)</label>
          <textarea pInputTextarea formControlName="bio" class="w-full" rows="3" 
            placeholder="Breve descripción del speaker..."></textarea>
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
export class SpeakerDialogComponent {
  readonly visible = input.required<boolean>();
  readonly isEditing = input<boolean>(false);
  readonly speakerForm = input<FormGroup>();
  readonly imagePreview = input<string>();

  readonly onSave = output<void>();
  readonly onCancel = output<void>();
  readonly onImageSelect = output<any>();
  readonly onVisibleChange = output<boolean>();
}

