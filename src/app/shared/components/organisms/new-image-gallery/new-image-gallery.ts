import { Component, EventEmitter, Output, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { extractData } from '@core/index';
import { ImageResponse } from '@core/models/event.models';
import { GalleryImageService } from '@core/services/image-gallery.service';
import { AssetsSrcDirective } from '@shared/directives/assets-src.directive';
import { GalleriaModule } from 'primeng/galleria';
import { catchError, map, of } from 'rxjs';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'new-image-gallery',
  standalone: true,
  imports: [GalleriaModule, AssetsSrcDirective, Button, ToastModule],
  providers: [MessageService],
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
  pageSize = 25;
  currentPage = 1;
  isPaging = false;
  private pagingTimeout: ReturnType<typeof setTimeout> | null = null;
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
    const absoluteIndex = (this.currentPage - 1) * this.pageSize + index;
    this.activeIndex = absoluteIndex;
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

  paginatedImages(): ImageResponse[] {
    const all = this.images() ?? [];
    const total = this.totalPages;
    if (this.currentPage > total) {
      this.currentPage = total;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    const total = Math.ceil(this.images().length / this.pageSize);
    return total > 0 ? total : 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.triggerPagingEffect();
      this.scrollToTop();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.triggerPagingEffect();
      this.scrollToTop();
    }
  }

  goToPage(page: number): void {
    const target = Math.min(Math.max(page, 1), this.totalPages);
    this.currentPage = target;
    this.triggerPagingEffect();
    this.scrollToTop();
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  private triggerPagingEffect(): void {
    this.isPaging = true;
    if (this.pagingTimeout) {
      clearTimeout(this.pagingTimeout);
    }
    this.pagingTimeout = setTimeout(() => {
      this.isPaging = false;
      this.pagingTimeout = null;
    }, 200);
  }

  private scrollToTop(): void {
    if (typeof document === 'undefined') {
      return;
    }

    // Defer scroll para asegurar que la vista se renderice antes de moverla
    setTimeout(() => {
      const target =
        document.querySelector('.image-gallery-actions') ??
        document.querySelector('.image-gallery-header') ??
        document.querySelector('.image-gallery-section') ??
        document.querySelector('.image-gallery-grid') ??
        document.querySelector('.image-gallery-container');

      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  }

  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Guardado con exito!',
    });
  }
}
