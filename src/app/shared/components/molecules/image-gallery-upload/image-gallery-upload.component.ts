import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface ImagePreview {
  id: string;
  url: string;
  file: File;
  isMain: boolean;
}

@Component({
  selector: 'app-image-gallery-upload',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule, ToastModule],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div class="space-y-4">
      <!-- Upload Area -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (drop)="onDrop($event)"
      >
        <input
          #fileInput
          type="file"
          accept="image/*"
          [multiple]="allowMultiple()"
          (change)="onFileSelect($event)"
          class="hidden"
        />

        <div class="flex flex-col items-center gap-3">
          <div
            class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center"
          >
            <i class="pi pi-cloud-upload text-3xl text-blue-600"></i>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-900">
              {{ allowMultiple() ? 'Sube tus imágenes' : 'Sube tu imagen' }}
            </p>
            <p class="text-sm text-gray-500">
              Arrastra y suelta o haz click para seleccionar
            </p>
            <p class="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
          </div>
        </div>
      </div>

      <!-- Image Gallery -->
      @if (images().length > 0) {
      <div
        class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2"
      >
        @for (image of images(); track image.id; let idx = $index) {
        <div
          class="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all"
        >
          <!-- Image Preview -->
          <div class="aspect-square overflow-hidden bg-gray-100">
            <img
              [src]="image.url"
              [alt]="'Image ' + (idx + 1)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <!-- Image Actions Overlay -->
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2"
          >
            <div
              class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2"
            >
              @if (allowMultiple()) {
              <p-button
                [icon]="image.isMain ? 'pi pi-star-fill' : 'pi pi-star'"
                [rounded]="true"
                [text]="true"
                [severity]="image.isMain ? 'contrast' : 'secondary'"
                size="small"
                (onClick)="setAsMain(idx)"
                pTooltip="Imagen principal"
                styleClass="bg-white/90"
              />
              }
              <p-button
                icon="pi pi-trash"
                [rounded]="true"
                [text]="true"
                severity="danger"
                size="small"
                (onClick)="removeImage(idx)"
                pTooltip="Eliminar"
                styleClass="bg-white/90"
              />
            </div>
          </div>

          <!-- Main Badge -->
          @if (image.isMain) {
          <div class="absolute top-2 left-2">
            <span
              class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-lg shadow-lg"
            >
              <i class="pi pi-star-fill"></i>
              Principal
            </span>
          </div>
          }

          <!-- Image Number -->
          <div class="absolute top-2 right-2">
            <span
              class="inline-flex items-center justify-center w-6 h-6 bg-gray-900/70 text-white text-xs font-semibold rounded-full"
            >
              {{ idx + 1 }}
            </span>
          </div>
        </div>
        }
      </div>

      <!-- Gallery Info -->
      <div class="flex items-center justify-between text-sm text-gray-600 pt-2">
        <span>{{ images().length }} imagen(es) cargada(s)</span>
        @if (allowMultiple()) {
        <div class="flex items-center gap-2">
          <div class="card flex justify-center">
            <p-toast
              [breakpoints]="{
                '920px': { width: '100%', right: '0', left: '0' }
              }"
            />
            <p-button
              icon="pi pi-save"
              (click)="show()"
              label="Guardar en la galeria"
            />
          </div>

          <p-button
            label="Limpiar todo"
            icon="pi pi-trash"
            size="small"
            [text]="true"
            severity="danger"
            (onClick)="clearAll()"
          />
        </div>
        }
      </div>
      }
    </div>
  `,
})
export class ImageGalleryUploadComponent {
  readonly allowMultiple = input<boolean>(true);
  readonly maxFileSize = input<number>(5000000);

  readonly onImagesChange = output<ImagePreview[]>();
  readonly onMainImageChange = output<ImagePreview | null>();
  readonly onSave = output<ImagePreview[]>();

  images = signal<ImagePreview[]>([]);

  onFileSelect(event: any) {
    const files = event.target.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  private processFiles(files: File[]) {
    files.forEach((file) => {
      if (file.type.startsWith('image/') && file.size <= this.maxFileSize()) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const newImage: ImagePreview = {
            id: `${Date.now()}-${Math.random()}`,
            url: e.target.result,
            file: file,
            isMain: this.images().length === 0,
          };

          const updatedImages = this.allowMultiple()
            ? [...this.images(), newImage]
            : [newImage];

          this.images.set(updatedImages);
          this.onImagesChange.emit(updatedImages);

          const mainImage = updatedImages.find((img) => img.isMain);
          this.onMainImageChange.emit(mainImage || null);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  setAsMain(index: number) {
    const updatedImages = this.images().map((img, idx) => ({
      ...img,
      isMain: idx === index,
    }));
    this.images.set(updatedImages);
    this.onImagesChange.emit(updatedImages);

    const mainImage = updatedImages.find((img) => img.isMain);
    this.onMainImageChange.emit(mainImage || null);
  }

  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Guardado con exito!',
    });
  }

  removeImage(index: number) {
    const currentImages = this.images();
    const removedImage = currentImages[index];
    const updatedImages = currentImages.filter((_, idx) => idx !== index);

    if (removedImage.isMain && updatedImages.length > 0) {
      updatedImages[0].isMain = true;
    }

    this.images.set(updatedImages);
    this.onImagesChange.emit(updatedImages);

    const mainImage = updatedImages.find((img) => img.isMain);
    this.onMainImageChange.emit(mainImage || null);
  }

  clearAll() {
    this.images.set([]);
    this.onImagesChange.emit([]);
    this.onMainImageChange.emit(null);
  }

  saveToGallery() {
    const imgs = this.images();
    if (!imgs.length) return;
    this.onSave.emit(imgs);
  }
}
