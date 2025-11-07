// import { Component, model } from '@angular/core';
// import { PhotoService } from 'app/features/events/services/photoservice';
// import { GalleriaModule } from 'primeng/galleria';

// @Component({
//   selector: 'app-image-galery',
//   imports: [GalleriaModule],
//   templateUrl: './image-galery.html',
//   standalone: true,
// })
// export class ImageGallery {
//   displayCustom: boolean | undefined;

//   activeIndex: number = 0;

//   images = model([]);

//   responsiveOptions: any[] = [
//     {
//       breakpoint: '1024px',
//       numVisible: 5,
//     },
//     {
//       breakpoint: '768px',
//       numVisible: 3,
//     },
//     {
//       breakpoint: '560px',
//       numVisible: 1,
//     },
//   ];

//   constructor(private photoService: PhotoService) {}

//   ngOnInit() {
//     this.photoService.getImages().then((images) => this.images.set(images));
//   }

//   imageClick(index: number) {
//     this.activeIndex = index;
//     this.displayCustom = true;
//   }
// }

// image-galery.component.ts
import {
  Component,
  effect,
  signal,
  computed,
  inject,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from 'app/features/events/services/photoservice';

export interface GItem {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt?: string;
  title?: string;
}

@Component({
  selector: 'app-image-galery',
  standalone: true,
  imports: [CommonModule, GalleriaModule],
  templateUrl: './image-galery.html',
})
export class ImageGalery {
  private photoService = inject(PhotoService);

  // UI state
  displayCustom = signal(false);
  activeIndex = signal(0);

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  // Datos crudos desde el servicio
  private raw = signal<any[]>([]);

  // ViewModel que Galleria entiende
  images = computed<GItem[]>(() =>
    this.raw().map((x) => {
      const url =
        typeof x === 'string' ? x : x.url ?? x.src ?? x.itemImageSrc ?? '';
      const thumb =
        typeof x === 'string' ? x : x.thumbnail ?? x.thumbnailImageSrc ?? url;
      return {
        itemImageSrc: url,
        thumbnailImageSrc: thumb,
        alt: x.alt ?? '',
        title: x.title ?? '',
      };
    })
  );

  // Carga con effect (una vez). Se permite escribir señales dentro del effect.
  readonly loadEffect = effect(
    async () => {
      if (this.raw().length === 0) {
        const data = await this.photoService.getImages(); // Promise<any[]>
        this.raw.set(data ?? []);
      }
    },
    { allowSignalWrites: true }
  );
  index!: TrackByFunction<GItem>;

  imageClick(index: number) {
    this.activeIndex.set(index);
    this.displayCustom.set(true);
  }
}
