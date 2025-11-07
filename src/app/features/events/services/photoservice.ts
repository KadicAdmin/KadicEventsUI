import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  [x: string]: any;

  constructor() {
    itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg';
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg';
    alt: 'Description for Image 1';
    title: 'Title 1';
  }
}
