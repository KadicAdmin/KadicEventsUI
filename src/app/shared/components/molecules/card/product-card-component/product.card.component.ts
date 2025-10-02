import { Component } from '@angular/core';
import { UiProductImgeComponent } from '@shared/components/atoms/image-card/ui.product.imge.component';
import { UiTextDateComponent } from '@shared/components/atoms/date-card/ui.text.date.component';
import { UiProductTittleComponent } from '@shared/components/atoms/product-tittle/product.tittle.component';
import { UiTextLocationComponent } from '@shared/components/atoms/location-card/ui.text.location';
import { UiTextPriceComponent } from '@shared/components/atoms/ui-price/ui.text.price.component';
// import { CardModule } from 'primeng/card';
// import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  imports: [
    UiProductImgeComponent,
    UiTextDateComponent,
    UiTextLocationComponent,
    UiTextPriceComponent,
    UiProductTittleComponent,
  ],
  templateUrl: './product.card.component.html',
})
export class ProductCardComponent {
  onCardClick() {
    throw new Error('Method not implemented.');
  }
}
