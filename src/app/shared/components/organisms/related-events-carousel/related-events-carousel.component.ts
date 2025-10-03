import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

export interface RelatedEvent {
  id: number;
  title: string;
  imageUrl?: string;
  date: Date | string;
  location: string;
  price?: number;
  currency?: string;
}

@Component({
  selector: 'related-events-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 class="text-2xl font-bold text-gray-900 mb-6">
        Eventos Relacionados
      </h3>
      
      @if (events().length > 0) {
        <p-carousel
          [value]="events()"
          [numVisible]="3"
          [numScroll]="1"
          [responsiveOptions]="responsiveOptions"
          [circular]="true">
          
          <ng-template let-event pTemplate="item">
            <div class="mx-2">
              <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                   (click)="onEventClick(event)">
                
                <!-- Event Image -->
                <div class="relative h-40 bg-gray-200">
                  @if (event.imageUrl) {
                    <img 
                      [src]="event.imageUrl" 
                      [alt]="event.title"
                      class="w-full h-full object-cover" />
                  } @else {
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                      <i class="pi pi-image text-2xl text-gray-400"></i>
                    </div>
                  }
                </div>
                
                <!-- Event Content -->
                <div class="p-4">
                  <h4 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {{ event.title }}
                  </h4>
                  
                  <div class="space-y-1 text-sm text-gray-600">
                    <p class="flex items-center gap-1">
                      <i class="pi pi-calendar"></i>
                      {{ formatDate(event.date) }}
                    </p>
                    <p class="flex items-center gap-1">
                      <i class="pi pi-map-marker"></i>
                      {{ event.location }}
                    </p>
                    @if (event.price !== undefined) {
                      <p class="flex items-center gap-1">
                        <i class="pi pi-money-bill"></i>
                        {{ event.currency || '$' }}{{ event.price }}
                      </p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </ng-template>
        </p-carousel>
      } @else {
        <div class="text-center py-8">
          <i class="pi pi-calendar-times text-3xl text-gray-400 mb-2"></i>
          <p class="text-sm text-gray-500">
            No hay eventos relacionados disponibles
          </p>
        </div>
      }
    </div>
  `
})
export class RelatedEventsCarouselComponent {
  readonly events = input<RelatedEvent[]>([]);

  readonly eventClicked = output<RelatedEvent>();

  readonly responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  onEventClick(event: RelatedEvent): void {
    this.eventClicked.emit(event);
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  }
}