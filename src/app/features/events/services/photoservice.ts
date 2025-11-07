// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class PhotoService {
//   [x: string]: any;

//   constructor() {
//     itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg';
//     thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg';
//     alt: 'Description for Image 1';
//     title: 'Title 1';
//   }
// }

// photo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GItem } from '@shared/components/organisms/image-galery/image-galery';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  // Si tu API ya devuelve el shape de Galleria:
  getImages(): Promise<GItem[]> {
    return firstValueFrom(this.http.get<GItem[]>('/api/photos'));
  }

  // Si tu API devuelve URLs (strings), descomenta este y adapta el effect para no mapear dos veces.
  // getImages(): Promise<string[]> {
  //   return firstValueFrom(this.http.get<string[]>('/api/photos'));
  // }
}
