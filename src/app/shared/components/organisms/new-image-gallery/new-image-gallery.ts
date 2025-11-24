import { Component, EventEmitter, Output, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { extractData } from '@core/index';
import { ImageResponse } from '@core/models/event.models';
import { GalleryImageService } from '@core/services/image-gallery.service';
import { AssetsSrcDirective } from '@shared/directives/assets-src.directive';
import { GalleriaModule } from 'primeng/galleria';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'new-image-gallery',
  standalone: true,
  imports: [GalleriaModule, AssetsSrcDirective],
  templateUrl: './new-image-gallery.html',
})
export class NewImageGallery {
  tabs() {
    throw new Error('Method not implemented.');
  }

  @Output() editImage = new EventEmitter<ImageResponse>();
  @Output() deleteImage = new EventEmitter<ImageResponse>();
  @Output() selectionChange = new EventEmitter<ImageResponse[]>();
  @Output() deleteSelected = new EventEmitter<ImageResponse[]>();

  displayCustom = false;
  activeIndex = 0;
  private readonly selectedIds = new Set<ImageResponse['id']>();

  private readonly galleryImageService = inject(GalleryImageService);

  readonly responsiveOptions: { breakpoint: string; numVisible: number }[] = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  // readonly signal usando toSignal
  readonly images = toSignal(
    this.galleryImageService.getAll().pipe(
      extractData<ImageResponse[]>(),
      map((images: ImageResponse[] | null | undefined): ImageResponse[] => {
        const safeImages = images ?? [];

        console.log(safeImages);

        return safeImages
          .filter((img: ImageResponse) => img.isActive)
          .map((img: ImageResponse) => ({
            ...img,
            thumbnailUrl: img.thumbnailUrl ?? img.imageUrl,
          }));
      }),
      catchError((err: unknown) => {
        console.error('Error cargando imagenes', err);
        return of([] as ImageResponse[]);
      })
    ),
    { initialValue: [] as ImageResponse[] }
  );

  imageClick(index: number): void {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  onEditImage(image: ImageResponse, event: Event): void {
    event.stopPropagation();
    this.editImage.emit(image);
  }

  onDeleteImage(image: ImageResponse, event: Event): void {
    event.stopPropagation();
    this.deleteImage.emit(image);
  }

  toggleSelection(image: ImageResponse, event: Event): void {
    event.stopPropagation();
    if (image?.id === undefined || image?.id === null) {
      return;
    }

    if (this.selectedIds.has(image.id)) {
      this.selectedIds.delete(image.id);
    } else {
      this.selectedIds.add(image.id);
    }

    this.emitSelection();
  }

  isSelected(image: ImageResponse): boolean {
    if (image?.id === undefined || image?.id === null) {
      return false;
    }
    return this.selectedIds.has(image.id);
  }

  toggleSelectAll(event: Event): void {
    event.stopPropagation();
    if (this.isAllSelected()) {
      this.clearSelection();
    } else {
      this.selectAll();
    }
  }

  private selectAll(): void {
    const currentImages = this.images() ?? [];
    currentImages.forEach((img) => {
      if (img?.id !== undefined && img?.id !== null) {
        this.selectedIds.add(img.id);
      }
    });
    this.emitSelection();
  }

  private clearSelection(): void {
    this.selectedIds.clear();
    this.emitSelection();
  }

  isAllSelected(): boolean {
    const currentImages = this.images() ?? [];
    const selectable = currentImages.filter(
      (img) => img?.id !== undefined && img?.id !== null
    );
    if (selectable.length === 0) {
      return false;
    }
    return selectable.every((img) => this.selectedIds.has(img.id));
  }

  hasSelection(): boolean {
    return this.selectedIds.size > 0;
  }

  deleteSelectedImages(event: Event): void {
    event.stopPropagation();
    const selectedImages = this.getSelectedImages();
    if (selectedImages.length === 0) {
      return;
    }
    this.deleteSelected.emit(selectedImages);
    this.clearSelection();
  }

  private emitSelection(): void {
    const selectedImages = this.getSelectedImages();
    this.selectionChange.emit(selectedImages);
  }

  private getSelectedImages(): ImageResponse[] {
    const currentImages = this.images() ?? [];
    return currentImages.filter(
      (img) => img?.id !== undefined && this.selectedIds.has(img.id)
    );
  }
}
