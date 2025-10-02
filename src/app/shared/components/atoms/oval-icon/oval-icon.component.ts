import { Component, input } from '@angular/core';

export interface Category {
  icon?: string; // Para cambiar a TemplateRef si usamos íconos SVG
  label?: string; //Puse el ? para que no me de conflicto con los componentes a la hora de usar los elementos de la interface
}

@Component({
  selector: 'app-oval-icon',
  imports: [],
  templateUrl: './oval-icon.component.html',
})
export class OvalIconComponent {
  icon = input<string>();
}
