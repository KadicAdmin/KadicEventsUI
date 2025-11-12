import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, model, signal } from '@angular/core';
import { PhotoService } from 'app/features/events/services/photoservice';
import { GalleriaModule } from 'primeng/galleria';

export interface GalleryImage {
  itemImageSrc: string; // imagen grande
  thumbnailImageSrc: string; // miniatura
  alt?: string;
  title?: string;
}

@Component({
  selector: 'image-galery',
  imports: [GalleriaModule, CommonModule],
  templateUrl: './image-galery.html',
  standalone: true,
  providers: [PhotoService],
})
export class ImageGallery {
  // private photoService = inject(PhotoService);

  // displayCustom = signal(false);
  // // activeIndex = signal(0);
  // DisplayCustom = input(false);
  // // images = signal([]);
  // images = signal<GalleryImage[]>([]);

  // // responsiveOptions = [...]; // No necesita ser signal
  // responsiveOptions: any[] = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 5,
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3,
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1,
  //   },
  // ];
  // activeIndex: any;

  // constructor(private photoService: PhotoService) {
  //   effect(
  //     () => {
  //       (async () => {
  //         const imgs = await this.photoService.getImages();
  //         this.images.set(imgs);
  //       })();
  //     },
  //     { allowSignalWrites: true }
  //   );
  // }

  // imageClick(index: number) {
  //   this.activeIndex.set(index);
  //   this.displayCustom.set(true);
  // }

  // The galery that is working
  images = signal<GalleryImage[]>([]);

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

  constructor(private photoService: PhotoService) {
    // corre una sola vez (no lee otras señales), y permite escribir en signals
    effect(
      () => {
        //carga inicial
        this.photoService
          .getImages()
          .then((imgs) => this.images.set(imgs))
          .catch(console.error);
      },
      { allowSignalWrites: true }
    );
  }
}
