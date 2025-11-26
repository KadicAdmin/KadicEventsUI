import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { Select } from 'primeng/select';
// import { ImageGalleryUploadComponent } from '@shared/components/molecules/image-gallery-upload';
import { ModalComponent, ModalConfig } from './modal.component';
import { GalleryModal } from './gallery-modal/gallery-modal.component';

@Component({
  selector: 'app-refactored-speaker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TabsModule,
    Select,
    // ImageGalleryUploadComponent,
    ModalComponent,
    GalleryModal,
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
      (onSave)="onSave.emit()"
    >
      @if (speakerForm()) {
      <form [formGroup]="speakerForm()!" class="pt-4">
        <!-- Avatar Preview -->
        <div class="flex justify-center mb-6">
          <div class="relative">
            @if (previewUrl()) {
            <img
              [src]="previewUrl()"
              alt="Speaker"
              class="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
            />
            } @else {
            <div
              class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center"
            >
              <i class="pi pi-user text-4xl text-purple-600"></i>
            </div>
            }
          </div>
        </div>

        <!-- Tabs -->
        <p-tabs value="0">
          <p-tablist>
            <p-tab value="0">
              <i class="pi pi-user mr-2"></i>
              Básica
            </p-tab>
            <p-tab value="1">
              <i class="pi pi-id-card mr-2"></i>
              Académica
            </p-tab>
            <p-tab value="2">
              <i class="pi pi-link mr-2"></i>
              Redes
            </p-tab>
          </p-tablist>

          <p-tabpanels>
            <!-- Tab 1: Información Básica -->
            <p-tabpanel value="0">
              <div class="space-y-4 py-4">
                <!-- Imagen -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Foto del Speaker</label
                  >
                  <!-- <app-image-gallery-upload
                    [allowMultiple]="false"
                    (onMainImageChange)="handleImageChange($event)"
                  /> -->

                  <gallery-modal />
                </div>

                <!-- Nombre y Apellido -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Nombre <span class="text-red-500">*</span>
                    </label>
                    <input
                      pInputText
                      formControlName="firstName"
                      class="w-full"
                      placeholder="Juan"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Apellido <span class="text-red-500">*</span>
                    </label>
                    <input
                      pInputText
                      formControlName="lastName"
                      class="w-full"
                      placeholder="Pérez"
                    />
                  </div>
                </div>

                <!-- Email y Teléfono -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input
                      pInputText
                      type="email"
                      formControlName="email"
                      class="w-full"
                      placeholder="juan.perez@example.com"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700"
                      >Teléfono</label
                    >
                    <input
                      pInputText
                      type="tel"
                      formControlName="phoneNumber"
                      class="w-full"
                      placeholder="+1 (809) 123-4567"
                    />
                  </div>
                </div>

                <!-- Biografía -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Biografía</label
                  >
                  <textarea
                    pInputTextarea
                    formControlName="bio"
                    class="w-full"
                    rows="4"
                    placeholder="Breve descripción profesional del speaker..."
                  ></textarea>
                </div>
              </div>
            </p-tabpanel>

            <!-- Tab 2: Información Académica -->
            <p-tabpanel value="1">
              <div class="space-y-4 py-4">
                <!-- Título Académico -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Título Académico</label
                  >
                  <p-select
                    formControlName="academicTitleId"
                    [options]="academicTitles()"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un título"
                    class="w-full"
                    styleClass="w-full"
                  />
                </div>

                <!-- Nivel Académico -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Nivel Académico</label
                  >
                  <p-select
                    formControlName="academicLevelId"
                    [options]="academicLevels()"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un nivel"
                    class="w-full"
                    styleClass="w-full"
                  />
                </div>

                <!-- Área de Estudio -->
                <!-- <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Área de Estudio</label
                  >
                  <p-select
                    formControlName="studyAreaId"
                    [options]="studyAreas()"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un área"
                    class="w-full"
                    styleClass="w-full"
                  />
                </div> -->

                <!-- Institución Educativa -->
                <!-- <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Institución Educativa</label
                  >
                  <p-select
                    formControlName="educationalInstitutionId"
                    [options]="educationalInstitutions()"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona una institución"
                    class="w-full"
                    styleClass="w-full"
                  />
                </div> -->
                <!-- <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Área de Estudio da</label
                  >
                  <p-select
                    formControlName="studyAreaId"
                    [options]="educationalInstitutions()"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un área"
                    class="w-full"
                    styleClass="w-full"
                  />
                </div> -->
              </div>
            </p-tabpanel>

            <!-- Tab 3: Redes Sociales -->
            <p-tabpanel value="2">
              <div class="space-y-4 py-4">
                <!-- LinkedIn -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <i class="pi pi-linkedin text-blue-600"></i>
                    LinkedIn
                  </label>
                  <input
                    pInputText
                    formControlName="linkedInUrl"
                    class="w-full"
                    placeholder="https://linkedin.com/in/usuario"
                  />
                </div>

                <!-- Twitter -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <i class="pi pi-twitter text-sky-500"></i>
                    Twitter / X
                  </label>
                  <input
                    pInputText
                    formControlName="twitterUrl"
                    class="w-full"
                    placeholder="https://twitter.com/usuario"
                  />
                </div>

                <!-- Website -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <i class="pi pi-globe text-gray-600"></i>
                    Sitio Web Personal
                  </label>
                  <input
                    pInputText
                    formControlName="websiteUrl"
                    class="w-full"
                    placeholder="https://www.ejemplo.com"
                  />
                </div>
              </div>
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </form>
      }
    </app-modal>
  `,
})
export class RefactoredSpeakerDialogComponent {
  readonly visible = input.required<boolean>();
  readonly isEditing = input<boolean>(false);
  readonly speakerForm = input<FormGroup>();
  readonly imagePreview = input<string>();

  readonly academicTitles = input<any[]>([]);
  readonly academicLevels = input<any[]>([]);
  readonly studyAreas = input<any[]>([]);
  readonly educationalInstitutions = input<any[]>([]);

  readonly onSave = output<void>();
  readonly onCancel = output<void>();
  readonly onImageSelect = output<any>();
  readonly onVisibleChange = output<boolean>();

  previewUrl = signal<string | null>(null);

  modalConfig = signal<ModalConfig>({
    title: 'Nuevo Speaker',
    subtitle: 'Información completa del ponente',
    icon: 'pi pi-user',
    iconBgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    width: '700px',
    maxHeight: '90vh',
    draggable: false,
    resizable: false,
    closable: true,
    modal: true,
    styleClass: 'rounded-2xl',
  });

  handleImageChange(image: any) {
    if (image) {
      this.previewUrl.set(image.url);
      this.onImageSelect.emit({ files: [image.file] });
    } else {
      this.previewUrl.set(null);
    }
  }
}
