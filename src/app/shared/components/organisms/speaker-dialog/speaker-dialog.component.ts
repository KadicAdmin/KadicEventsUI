import { Component, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { Select } from 'primeng/select';
import { ImageGalleryUploadComponent } from '@shared/components/molecules/image-gallery-upload';
import { ModalComponent, ModalConfig } from '@shared/components/atoms/modal/modal.component';
import { Speaker } from '@core/models';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';
import { Carousel } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-speaker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TabsModule,
    Select,
    ImageGalleryUploadComponent,
    ModalComponent,
    ButtonModule,
    RadioButton,
    Carousel,
    CardModule,
    TagModule,
    AvatarModule,
    BadgeModule,
    MessageModule,
    DividerModule,
    ChipModule,
  ],
  template: `
    <app-modal 
      [visible]="visible()" 
      [config]="modalConfig()"
      [showFooter]="true"
      [cancelLabel]="'Cancelar'"
      [saveLabel]="speakerMode() === 'select' ? 'Seleccionar' : 'Guardar'"
      (onVisibleChange)="onVisibleChange.emit($event)"
      (onCancel)="handleCancel()"
      (onSave)="handleSave()">
      
      @if (speakerForm()) {
      <!-- Mode Selector -->
      <div class="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div class="flex items-center gap-2">
          <p-radiobutton 
            name="speakerMode" 
            value="select" 
            [(ngModel)]="speakerMode" 
            inputId="mode-select"
            [ngModelOptions]="{standalone: true}"/>
          <label for="mode-select" class="font-medium cursor-pointer flex items-center gap-2 text-gray-700">
            <i class="pi pi-search text-sm"></i>
            Seleccionar Existente
          </label>
        </div>
        <div class="flex items-center gap-2">
          <p-radiobutton 
            name="speakerMode" 
            value="create" 
            [(ngModel)]="speakerMode" 
            inputId="mode-create"
            [ngModelOptions]="{standalone: true}"/>
          <label for="mode-create" class="font-medium cursor-pointer flex items-center gap-2 text-gray-700">
            <i class="pi pi-plus text-sm"></i>
            Crear Nuevo
          </label>
        </div>
      </div>

      <!-- Select Mode: Lista de Speakers -->
      @if (speakerMode() === 'select') {
        <div class="p-6">
          <div class="space-y-6">
            <!-- Header Section -->
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <i class="pi pi-users text-gray-600"></i>
                Selecciona un Speaker 
                <span class="text-red-500">*</span>
              </h3>
              <p class="text-sm text-gray-600">
                Navega por los speakers disponibles y selecciona uno haciendo click en su tarjeta
              </p>
            </div>

            @if (availableSpeakers().length > 0) {
              <!-- Carousel Container -->
              <div class="relative">
                <p-carousel 
                  [value]="availableSpeakers()" 
                  [numVisible]="3" 
                  [numScroll]="1"
                  [circular]="true"
                  [responsiveOptions]="carouselResponsiveOptions"
                  [showIndicators]="true"
                  [showNavigators]="true"
                  styleClass="speaker-carousel">
                  <ng-template let-speaker pTemplate="item">
                    <div class="p-3">
                      <div 
                        (click)="selectSpeaker(speaker)"
                        [class]="selectedSpeakerIds().includes(speaker.id!) 
                          ? 'bg-white border-4 border-green-500 rounded-xl cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-sm flex flex-col h-48 selected'
                          : 'bg-white border border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-sm flex flex-col h-48'">
                        
                        <!-- Selected Badge -->
                        @if (selectedSpeakerIds().includes(speaker.id!)) {
                          <div class="absolute top-2 right-2 z-10">
                            <div class="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                              ✓
                            </div>
                          </div>
                        }

                        <!-- Speaker Image (70% height) -->
                        <div class="h-32 bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                          @if (speaker.profileImageUrl) {
                            <img 
                              [src]="speaker.profileImageUrl" 
                              [alt]="speaker.firstName + ' ' + speaker.lastName"
                              class="w-full h-full object-cover">
                          } @else {
                            <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                              <i class="pi pi-user text-4xl text-gray-400"></i>
                            </div>
                          }
                        </div>

                        <!-- Speaker Info (30% height) -->
                        <div class="h-16 p-2 text-center space-y-1 flex flex-col justify-between">

                          <!-- Name -->
                          <h4 class="text-sm font-semibold text-gray-800 truncate">
                            {{ speaker.firstName }} {{ speaker.lastName }}
                          </h4>
                          
                          <!-- Email -->
                          @if (speaker.email) {
                            <div class="flex items-center justify-center gap-1 text-gray-600">
                              <i class="pi pi-envelope text-xs"></i>
                              <span class="text-xs truncate">{{ speaker.email }}</span>
                            </div>
                          }

                          <!-- Tags -->
                          <div class="flex flex-wrap gap-1 justify-center">
                            @if (speaker.academicTitle?.name) {
                              <span class="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                                {{ speaker.academicTitle.name }}
                              </span>
                            }
                            @if (speaker.isActive) {
                              <span class="px-1.5 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                                <i class="pi pi-check-circle text-xs mr-1"></i>
                                Activo
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </p-carousel>
              </div>
            } @else {
              <!-- Empty State -->
              <div class="text-center py-12">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <i class="pi pi-users text-2xl text-gray-400"></i>
                </div>
                <h4 class="text-lg font-medium text-gray-600 mb-2">No hay speakers disponibles</h4>
                <p class="text-gray-500 text-sm mb-4">Crea un nuevo speaker usando la opción "Crear Nuevo"</p>
                <p-button 
                  label="Cambiar a Crear Nuevo" 
                  icon="pi pi-plus"
                  (onClick)="speakerMode.set('create')"
                  styleClass="p-button-outlined p-button-sm">
                </p-button>
              </div>
            }
            
            <!-- Success Message -->
            @if (selectedSpeakerIds().length > 0) {
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center gap-3">
                  <i class="pi pi-check-circle text-green-600"></i>
                  <div>
                    <p class="font-medium text-green-900">
                      {{ selectedSpeakerIds().length }} Speaker{{ selectedSpeakerIds().length > 1 ? 's' : '' }} Seleccionado{{ selectedSpeakerIds().length > 1 ? 's' : '' }}
                    </p>
                    <p class="text-sm text-green-700">
                      Haz clic en "Seleccionar" para agregar{{ selectedSpeakerIds().length > 1 ? 'los' : 'lo' }} al evento
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Create/Edit Mode: Formulario -->
      @if (speakerMode() === 'create' || speakerMode() === 'edit') {
      <form [formGroup]="speakerForm()!" class="pt-4">
        <!-- Avatar Preview -->
        <div class="flex justify-center mb-6">
          <div class="relative">
            @if (previewUrl()) {
            <img [src]="previewUrl()" alt="Speaker" 
              class="w-24 h-24 rounded-full object-cover border-4 border-purple-100" />
            } @else {
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
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
            <!-- Tab de Redes Sociales deshabilitado temporalmente -->
            <!--
            <p-tab value="2">
              <i class="pi pi-link mr-2"></i>
              Redes
            </p-tab>
            -->
          </p-tablist>
          
          <p-tabpanels>
            <!-- Tab 1: Información Básica -->
            <p-tabpanel value="0">
              <div class="space-y-4 py-4">
                <!-- Imagen -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Foto del Speaker</label>
                  <app-image-gallery-upload
                    [allowMultiple]="false"
                    (onMainImageChange)="handleImageChange($event)"
                  />
                </div>

                <!-- Nombre y Apellido -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Nombre <span class="text-red-500">*</span>
                    </label>
                    <input pInputText formControlName="name" class="w-full" 
                      placeholder="Juan" />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Apellido <span class="text-red-500">*</span>
                    </label>
                    <input pInputText formControlName="lastName" class="w-full" 
                      placeholder="Pérez" />
                  </div>
                </div>

                <!-- Email y Teléfono -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input pInputText type="email" formControlName="email" class="w-full" 
                      placeholder="juan.perez@example.com" />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Teléfono</label>
                    <input pInputText type="tel" formControlName="phoneNumber" class="w-full" 
                      placeholder="+1 (809) 123-4567" />
                  </div>
                </div>

                <!-- Fecha de Nacimiento -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">
                    Fecha de Nacimiento <span class="text-red-500">*</span>
                  </label>
                  <input pInputText formControlName="birthDay" type="date" class="w-full" />
                </div>

                <!-- Género y País -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      Género <span class="text-red-500">*</span>
                    </label>
                    <input pInputText formControlName="gendersId" type="number" class="w-full" 
                      placeholder="1" />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">
                      País <span class="text-red-500">*</span>
                    </label>
                    <input pInputText formControlName="countriesId" type="number" class="w-full" 
                      placeholder="1" />
                  </div>
                </div>

                <!-- Biografía -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Biografía</label>
                  <textarea pInputTextarea formControlName="commentary" rows="4" 
                    placeholder="Breve descripción profesional del speaker..."></textarea>
                </div>
              </div>
            </p-tabpanel>

            <!-- Tab 2: Información Académica -->
            <p-tabpanel value="1">
              <div class="space-y-4 py-4">
                <!-- Título Académico -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Título Académico</label>
                  <p-select formControlName="academicDegreesId" [options]="academicTitles()" 
                    optionLabel="name" optionValue="id" placeholder="Selecciona un título" 
                    class="w-full" styleClass="w-full" />
                </div>

                <!-- Nivel Académico -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Nivel Académico</label>
                  <p-select formControlName="academicLevelsId" [options]="academicLevels()" 
                    optionLabel="name" optionValue="id" placeholder="Selecciona un nivel" 
                    class="w-full" styleClass="w-full" />
                </div>

                <!-- Área de Estudio -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Área de Estudio</label>
                  <p-select formControlName="areaOfStudyId" [options]="studyAreas()" 
                    optionLabel="name" optionValue="id" placeholder="Selecciona un área" 
                    class="w-full" styleClass="w-full" />
                </div>

                <!-- Institución Educativa (Deshabilitado temporalmente - no está en el modelo API) -->
                <!--
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Institución Educativa</label>
                  <p-select formControlName="educationalInstitutionId" 
                    [options]="educationalInstitutions()" optionLabel="name" optionValue="id" 
                    placeholder="Selecciona una institución" class="w-full" styleClass="w-full" />
                </div>
                -->
              </div>
            </p-tabpanel>

            <!-- Tab 3: Redes Sociales (Deshabilitado temporalmente - no están en el modelo API) -->
            <!--
            <p-tabpanel value="2">
              <div class="space-y-4 py-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <i class="pi pi-linkedin text-blue-600"></i>
                    LinkedIn
                  </label>
                  <input pInputText formControlName="linkedInUrl" class="w-full" 
                    placeholder="https://linkedin.com/in/usuario" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <i class="pi pi-twitter text-sky-500"></i>
                    Twitter / X
                  </label>
                  <input pInputText formControlName="twitterUrl" class="w-full" 
                    placeholder="https://twitter.com/usuario" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <i class="pi pi-globe text-gray-600"></i>
                    Sitio Web Personal
                  </label>
                  <input pInputText formControlName="websiteUrl" class="w-full" 
                    placeholder="https://www.ejemplo.com" />
                </div>
              </div>
            </p-tabpanel>
            -->
          </p-tabpanels>
        </p-tabs>
      </form>
      }
      }
    </app-modal>
  `,
  styles: [`
    :host ::ng-deep {
      /* Speaker Card Styles */
      .speaker-card {
        transition: all 0.2s ease;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        position: relative;
      }

      .speaker-card:hover {
        border-color: #cbd5e1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .speaker-card.selected {
        border-color: #10b981;
        border-width: 3px;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        background: #f0fdf4;
        transform: scale(1.02);
      }

      /* Carousel Customization */
      .speaker-carousel {
        .p-carousel-content {
          padding: 1rem 0;
        }

        .p-carousel-item {
          display: flex;
          align-items: stretch;
          height: 100%;
        }

        .p-carousel-prev,
        .p-carousel-next {
          background: #f8fafc !important;
          color: #64748b !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 50% !important;
          width: 2.5rem !important;
          height: 2.5rem !important;
          transition: all 0.2s ease !important;
        }

        .p-carousel-prev:hover,
        .p-carousel-next:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          color: #475569 !important;
        }

        .p-carousel-indicators {
          padding: 1rem 0 0.5rem 0;
        }

        .p-carousel-indicator button {
          width: 0.5rem !important;
          height: 0.5rem !important;
          border-radius: 50% !important;
          background-color: #e2e8f0 !important;
          transition: all 0.2s ease !important;
          border: none !important;
        }

        .p-carousel-indicator.p-highlight button {
          background: #3b82f6 !important;
          width: 1.5rem !important;
          border-radius: 0.75rem !important;
        }
      }

      /* PrimeNG Card Customization */
      .p-card {
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }

      .p-card-body {
        padding: 0 !important;
      }

      .p-card-content {
        padding: 0 !important;
      }

      /* Speaker Image Styling */
      .speaker-card img {
        object-fit: cover;
        object-position: center;
      }

      /* Text truncation for bio */
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .speaker-card {
          margin: 0.25rem;
        }
        
        .p-carousel-prev,
        .p-carousel-next {
          width: 2rem !important;
          height: 2rem !important;
        }
      }
    }
  `]
})
export class SpeakerDialogComponent {
  readonly visible = input.required<boolean>();
  readonly isEditing = input<boolean>(false);
  readonly speakerForm = input<FormGroup>();
  readonly imagePreview = input<string>();
  readonly availableSpeakers = input<Speaker[]>([]);
  readonly assignedSpeakers = input<Speaker[]>([]);
  readonly speakerToEdit = input<Speaker>();

  readonly academicTitles = input<any[]>([]);
  readonly academicLevels = input<any[]>([]);
  readonly studyAreas = input<any[]>([]);
  readonly educationalInstitutions = input<any[]>([]);

  readonly onSave = output<void>();
  readonly onCancel = output<void>();
  readonly onImageSelect = output<any>();
  readonly onVisibleChange = output<boolean>();
  readonly onSelectExistingSpeaker = output<Speaker>();
  readonly onUpdateSpeaker = output<Speaker>();

  // Modo de operación: 'select' para seleccionar existente, 'create' para crear nuevo, 'edit' para editar
  speakerMode = signal<'select' | 'create' | 'edit'>('select');
  selectedSpeakerIds = signal<number[]>([]);
  previewUrl = signal<string | null>(null);
  private isInitialized = false;

  // Configuración responsive del carrusel
  carouselResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  // Configuración del modal que se actualiza según el modo de edición
  modalConfig = computed<ModalConfig>(() => ({
    title: this.isEditing() ? 'Editar Speaker' : 'Nuevo Speaker',
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
    styleClass: 'rounded-2xl'
  }));

  handleImageChange(image: any) {
    if (image) {
      this.previewUrl.set(image.url);
      this.onImageSelect.emit({ files: [image.file] });
    } else {
      this.previewUrl.set(null);
    }
  }

  selectSpeaker(speaker: Speaker) {
    const currentIds = this.selectedSpeakerIds();
    if (currentIds.includes(speaker.id!)) {
      // Si ya está seleccionado, lo removemos
      this.selectedSpeakerIds.set(currentIds.filter(id => id !== speaker.id));
    } else {
      // Si no está seleccionado, lo agregamos
      this.selectedSpeakerIds.set([...currentIds, speaker.id!]);
    }
  }

  handleSave() {
    if (this.speakerMode() === 'select') {
      // Modo selección: emitir los speakers seleccionados
      const selectedIds = this.selectedSpeakerIds();
      console.log('Speakers seleccionados para guardar:', selectedIds); // Debug

      if (selectedIds.length > 0) {
        const selectedSpeakers = this.availableSpeakers().filter(s => selectedIds.includes(s.id!));
        console.log('Speakers encontrados:', selectedSpeakers); // Debug

        // Emitir todos los speakers de una vez
        selectedSpeakers.forEach(speaker => {
          console.log('Emitiendo speaker:', speaker); // Debug
          this.onSelectExistingSpeaker.emit(speaker);
        });

        this.resetDialog();
        this.isInitialized = false;

        // Cerrar el diálogo
        this.onVisibleChange.emit(false);
      }
    } else if (this.speakerMode() === 'edit') {
      // Modo edición: emitir el speaker actualizado
      const speakerToEdit = this.speakerToEdit();
      if (speakerToEdit) {
        console.log('Speaker actualizado:', speakerToEdit); // Debug
        this.onUpdateSpeaker.emit(speakerToEdit);
      }

      this.resetDialog();
      this.isInitialized = false;

      // Cerrar el diálogo
      this.onVisibleChange.emit(false);
    } else {
      // Modo creación: usar el comportamiento original
      this.onSave.emit();
    }
  }

  handleCancel() {
    this.resetDialog();
    this.isInitialized = false;
    this.onCancel.emit();
  }

  private resetDialog() {
    // Solo limpiar, no inicializar con speakers asignados
    this.selectedSpeakerIds.set([]);
    this.speakerMode.set('select');
    this.previewUrl.set(null);
  }

  // Método para inicializar cuando se abre el diálogo
  private initializeDialog() {
    if (this.isEditing() && this.speakerToEdit()) {
      // Modo edición: no mostrar selección, ir directo al formulario
      this.speakerMode.set('edit');
      this.previewUrl.set(this.speakerToEdit()?.profileImageUrl || null);
    } else {
      // Modo selección: inicializar con los speakers ya asignados
      const assignedIds = this.assignedSpeakers().map(speaker => speaker.id!);
      this.selectedSpeakerIds.set(assignedIds);
      this.speakerMode.set('select');
      this.previewUrl.set(null);
    }
  }

  constructor() {
    // Effect para inicializar cuando se abre el diálogo
    effect(() => {
      if (this.visible() && !this.isInitialized) {
        this.initializeDialog();
        this.isInitialized = true;
      } else if (!this.visible()) {
        this.isInitialized = false;
      }
    });
  }
}