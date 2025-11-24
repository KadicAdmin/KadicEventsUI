import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-product-tittle',
  template: `
    <h3 class="text-base font-bold uppercase leading-tight">
      {{ title() || 'Título no disponible' }}
    </h3>
  `,
  standalone: true
})
export class UiProductTittleComponent {
  readonly title = input<string>('');
}
