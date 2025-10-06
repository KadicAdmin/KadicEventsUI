import { Component, input } from '@angular/core';
import { UiProductImgeComponent } from '@shared/components/atoms/image-card/ui.product.imge.component';
import { Event } from '../../../../../core/models';

@Component({
  selector: 'app-product-card',
  imports: [
    UiProductImgeComponent,
  ],
  templateUrl: './product.card.component.html',
  standalone: true
})
export class ProductCardComponent {
  readonly event = input<Event | null>(null);

  onCardClick() {
    throw new Error('Method not implemented.');
  }

  getEventStartDate(): string {
    const event = this.event();
    if (!event || !event.eventDates || event.eventDates.length === 0) {
      return 'Fecha no disponible';
    }

    const dates = event.eventDates.map(eventDate => new Date(eventDate.date));
    const earliestDate = new Date(Math.min(...dates.map(date => date.getTime())));
    return this.formatDate(earliestDate);
  }

  getEventLocation(): string {
    const event = this.event();
    if (!event || !event.address) {
      return 'Ubicación no disponible';
    }

    const address = event.address;
    return `${address.city || ''}, ${address.country || ''}`.replace(/^,\s*|,\s*$/g, '') || 'Ubicación no disponible';
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
