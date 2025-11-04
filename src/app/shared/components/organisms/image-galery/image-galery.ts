import { Component, model } from '@angular/core';
import { PhotoService } from 'app/features/events/services/photoservice';

@Component({
  selector: 'app-image-galery',
  imports: [],
  templateUrl: './image-galery.html',
})
export class ImageGalery {
  displayCustom: boolean | undefined;

    activeIndex: number = 0;

    images = model([]);

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
 }
