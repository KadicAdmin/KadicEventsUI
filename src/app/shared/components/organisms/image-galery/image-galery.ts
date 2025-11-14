// import { CommonModule } from '@angular/common';
// import { Component, effect, signal } from '@angular/core';
// import { GalleriaModule } from 'primeng/galleria';
// import { ImageFileUpload } from "@shared/components/molecules/image-file-upload/image-file-upload";

// export interface GalleryImages {
//   itemImageSrc: string; // imagen grande
//   thumbnailImageSrc: string; // miniatura
//   alt?: string;
//   title?: string;
// }

// @Component({
//   selector: 'image-galery',
//   imports: [GalleriaModule, CommonModule, ImageFileUpload],
//   templateUrl: './image-galery.html',
//   standalone: true,
//   providers: [PhotoService],
// })
// export class ImageGallery {
//   images = signal<GalleryImages[]>([]);
//   responsiveOptions: any[] = [
//     {
//       breakpoint: '1300px',
//       numVisible: 4,
//     },
//     {
//       breakpoint: '575px',
//       numVisible: 1,
//     },
//   ];

//   constructor(private photoService: PhotoService) {
//     effect(
//       () => {
//         this.photoService
//           .getImages()
//           .then((imgs) => this.images.set(imgs))
//           .catch(console.error);
//       },
//       { allowSignalWrites: true }
//     );
//   }
// }
