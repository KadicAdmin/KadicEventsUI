import { Component, input, output } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import type { ImgProps } from '@core/models/core.models';
import { IMAGES_SLIDESHOW } from '@core/constants/core.contans';


@Component({
  selector: 'app-slideshows',
  imports: [GalleriaModule],
  templateUrl: './slideshows.html',

})
export class Slideshows {

  clickedImage = output<number>();
  images = input<ImgProps[]>(IMAGES_SLIDESHOW);
  onImageClick(item: ImgProps): void {
    this.clickedImage.emit(item.id);
  }
}
