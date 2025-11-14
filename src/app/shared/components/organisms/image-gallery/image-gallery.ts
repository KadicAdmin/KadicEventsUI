import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ImageFileUpload } from '@shared/components/molecules/image-file-upload/image-file-upload';
import { AssetsSrcDirective } from '@shared/directives/assets-src.directive';
import { ImageResponse } from '@core/models/event.models';
import { GalleryImageService } from '@core/services/image-gallery.service';
import { extractData } from '@core/index';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'image-galery',
  imports: [GalleriaModule, CommonModule, ImageFileUpload, AssetsSrcDirective],
  templateUrl: './image-gallery.html',
  standalone: true,
})
export class ImageGallery {
  private readonly galleryImageService = inject(GalleryImageService);
  readonly images = toSignal(
    this.galleryImageService.getAll().pipe(
      extractData<ImageResponse[]>(),
      map((imgs) =>
        (imgs ?? []).filter((img) => {
          const status = img.status as ImageResponse['status'] | boolean;
          return status === 'active' || status === true;
        })
      )
    ),
    { initialValue: [] }
  );

  readonly responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 1 },
  ];
}
