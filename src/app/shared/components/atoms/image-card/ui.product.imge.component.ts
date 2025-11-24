import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-product-image',
  template: `
    <img
      [src]="image()?.url || 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'"
      [alt]="image()?.description || 'Evento'"
      class="w-full h-40 object-cover"
    />
  `,
  standalone: true
})
export class UiProductImgeComponent {
  readonly image = input<any>(null);
}
