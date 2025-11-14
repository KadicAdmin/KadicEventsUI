import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
// import { PhotoService } from 'app/features/events/services/photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { ImageFileUpload } from '@shared/components/molecules/image-file-upload/image-file-upload';
import { ImageResponse } from '@core/models/event.models';
import { GalleryImageService } from '@core/services/image-gallery.service';

//this interface is to the gallery mock

// export interface GalleryImage {
//   itemImageSrc: string; // imagen grande
//   thumbnailImageSrc: string; // miniatura
//   alt?: string;
//   title?: string;
// }

@Component({
  selector: 'image-galery',
  imports: [GalleriaModule, CommonModule, ImageFileUpload],
  templateUrl: './image-gallery.html',
  standalone: true,
  // providers: [PhotoService],
})
export class ImageGallery {
  // The galery that is working to replace the first gallery for now
  images = signal<ImageResponse[]>([]);

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  constructor(private galleryImageService: GalleryImageService) {
    effect(
      () => {
        this.galleryImageService.getAll().subscribe({
          next: (res) => {
            const imgs = (res.data ?? []).filter(
              (img) => img.status === 'active'
            );

            this.images.set(imgs);
          },
          error: (err) => {
            console.error('Error cargando imágenes de la galería', err);
          },
        });
      },
      { allowSignalWrites: true }
    );
  }

  //Old code of gallery that is working

  // constructor(private photoService: PhotoService) {
  //   // corre una sola vez (no lee otras señales), y permite escribir en signals
  //   effect(
  //     () => {
  //       //carga inicial
  //       this.photoService
  //         .getImages()
  //         .then((imgs) => this.images.set(imgs))
  //         .catch(console.error);
  //     },
  //     { allowSignalWrites: true }
  //   );
  // }
}
