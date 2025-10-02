import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCardComponent } from '@shared/components/molecules/card/product-card-component/product.card.component';

@Component({
  selector: 'app-event.card.component',
  imports: [ProductCardComponent],
  templateUrl: './event.card.component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {}
