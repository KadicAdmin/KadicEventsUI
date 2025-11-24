import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Event } from '../../../../core/models';

@Component({
    selector: 'app-event-carousel',
    standalone: true,
    imports: [CommonModule, CarouselModule],
    template: `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ title() }}</h2>
          @if (subtitle()) {
            <p class="text-gray-600 mt-1">{{ subtitle() }}</p>
          }
        </div>
        @if (showViewAll()) {
          <button 
            class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            (click)="onViewAllClick()">
            Ver todos
          </button>
        }
      </div>

      <p-carousel 
        [value]="events()" 
        [numVisible]="numVisible()" 
        [numScroll]="numScroll()"
        [responsiveOptions]="responsiveOptions" 
        [circular]="circular()" 
        [autoplayInterval]="autoplayInterval()"
        [showIndicators]="showIndicators()"
        [showNavigators]="showNavigators()">
        
        <ng-template let-event pTemplate="item">
          <div class="mx-2">
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full"
                 (click)="onEventClick(event)">
              
              <!-- Event Image -->
              <div class="relative h-48 bg-gray-200">
                @if (event.images && event.images.length > 0) {
                  <img [src]="event.images[0].url" [alt]="event.name"
                       class="w-full h-full object-cover" />
                } @else {
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                    <i class="pi pi-image text-3xl text-gray-400"></i>
                  </div>
                }
              </div>
              
              <!-- Event Content -->
              <div class="p-4">
                <h4 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {{ event.name }}
                </h4>
                
                <div class="space-y-2 text-sm text-gray-600">
                  <p class="flex items-center gap-2">
                    <i class="pi pi-calendar text-blue-500"></i>
                    {{ event.startDate | date:'short' }}
                  </p>
                  <p class="flex items-center gap-2">
                    <i class="pi pi-map-marker text-green-500"></i>
                    {{ event.location }}
                  </p>
                  <p class="flex items-center gap-2">
                    <i class="pi pi-users text-purple-500"></i>
                    {{ event.currentParticipants }}/{{ event.maxParticipants }} participantes
                  </p>
                </div>
                
                <div class="mt-3 pt-3 border-t border-gray-100">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ event.eventType }}
                  </span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                    {{ event.modality }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </p-carousel>
    </div>
  `,
    styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class EventCarouselComponent {
    // Inputs
    readonly events = input<Event[]>([]);
    readonly title = input<string>('Eventos');
    readonly subtitle = input<string>('');
    readonly numVisible = input<number>(3);
    readonly numScroll = input<number>(1);
    readonly circular = input<boolean>(true);
    readonly autoplayInterval = input<number>(3000);
    readonly showIndicators = input<boolean>(true);
    readonly showNavigators = input<boolean>(true);
    readonly showViewAll = input<boolean>(false);

    // Outputs
    readonly eventClicked = output<Event>();
    readonly viewAllClicked = output<void>();

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

    onEventClick(event: Event): void {
        this.eventClicked.emit(event);
    }

    onViewAllClick(): void {
        this.viewAllClicked.emit();
    }
}

