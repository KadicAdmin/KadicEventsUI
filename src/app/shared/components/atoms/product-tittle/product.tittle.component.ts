import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-product-tittle',
  template: `
    <h3 class="text-base font-bold uppercase leading-tight">
      Titulo de ejemplo
    </h3>
  `,
})
export class UiProductTittleComponent {
  tittle = input<string>('');
}
