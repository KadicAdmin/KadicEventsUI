import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductCardComponent } from '@shared/components/molecules/card/product-card-component/product.card.component';
import { Event } from '../../../../core/models';

@Component({
  selector: 'app-card-list',
  imports: [ProductCardComponent],
  templateUrl: './event.card.component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CardsListComponent {
  readonly events = input<Event[]>([]);
}
