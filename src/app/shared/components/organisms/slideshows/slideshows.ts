import { Component, input, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Galleria } from 'primeng/galleria';
import type { ImgProps } from '@core/models/core.models';
import { IMAGES_SLIDESHOW } from '@core/constants/core.contans';

@Component({
  selector: 'app-slideshows',
  standalone: true,
  imports: [CommonModule, GalleriaModule, ButtonModule, TooltipModule],
  templateUrl: './slideshows.html',
  styleUrl: './slideshows.css'
})
export class Slideshows {
  @ViewChild('galleria') galleria!: Galleria;
  clickedImage = output<ImgProps>();
  images = input<ImgProps[]>(IMAGES_SLIDESHOW);
  height = input<string>('70vh');
  minHeight = input<string>('500px');
  autoPlay = input<boolean>(true);
  transitionInterval = input<number>(5000);
  showCounter = input<boolean>(true);
  showIndicators = input<boolean>(true);
  showTitle = input<boolean>(true);
  showDescription = input<boolean>(true);
  enableHoverPause = input<boolean>(true);

  currentIndex = signal(0);
  isHovering = signal(false);
  activeIndex = 0;

  get galleriaConfig() {
    return {
      showThumbnails: false,
      showIndicators: false,
      showItemNavigators: false,
      transitionInterval: this.transitionInterval(),
      autoPlay: this.autoPlay(),
      circular: true,
      numVisible: 5,
      transitionOptions: {
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        duration: 800
      },
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3
        },
        {
          breakpoint: '768px',
          numVisible: 2
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ]
    };
  }

  onImageClick(item: ImgProps): void {
    this.clickedImage.emit(item);
  }

  onIndexChange(event: any): void {
    const newIndex = event.index || 0;
    this.activeIndex = newIndex;
    this.currentIndex.set(newIndex);
    this.triggerContentAnimation();
  }

  private triggerContentAnimation(): void {
    setTimeout(() => {
      const titleElement = document.querySelector('h1[data-index]') as HTMLElement;
      const descElement = document.querySelector('p[data-index]') as HTMLElement;
      const imageElement = document.querySelector('img[data-image-index]') as HTMLElement;
      const shimmerElement = document.querySelector('.shimmer-effect') as HTMLElement;

      if (titleElement) {
        titleElement.style.animation = 'none';
        titleElement.offsetHeight;
        titleElement.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      }

      if (descElement) {
        descElement.style.animation = 'none';
        descElement.offsetHeight;
        descElement.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both';
      }

      if (imageElement) {
        imageElement.style.animation = 'none';
        imageElement.offsetHeight;
        imageElement.style.animation = 'scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      }

      if (shimmerElement) {
        shimmerElement.style.animation = 'none';
        shimmerElement.offsetHeight;
        shimmerElement.style.animation = 'shimmer 0.8s ease-out';
      }
    }, 100);
  }

  goToSlide(index: number): void {
    this.activeIndex = index;
    this.currentIndex.set(index);
    this.triggerContentAnimation();
  }


  onMouseEnter(): void {
    this.isHovering.set(true);
  }

  onMouseLeave(): void {
    this.isHovering.set(false);
  }

}
