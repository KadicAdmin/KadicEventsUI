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
