import { Component, input } from '@angular/core';

// interface ImgCards {} //Aca intente tipar las imagenes para pasar la inf del comp padre al hijo

@Component({
  selector: 'ui-product-image',
  template: `
    <img
      src="https://primefaces.org/cdn/primeng/images/card-ng.jpg"
      alt="Evento"
      class="w-full h-40 object-cover"
    />
  `,
})
export class UiProductImgeComponent {
  img = input();
}
