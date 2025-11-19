import { Component, inject } from '@angular/core';
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
  displayCustom = false;
  activeIndex = 0;

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
        console.error('Error cargando imágenes', err);
        return of([] as ImageResponse[]);
      })
    ),
    { initialValue: [] as ImageResponse[] }
  );

  imageClick(index: number): void {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
