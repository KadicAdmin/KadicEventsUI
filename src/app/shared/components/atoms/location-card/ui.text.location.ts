import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-text-location',
  template: ` 
    <p class="text-sm text-gray-600">
      {{ location() || 'Ubicación no disponible' }}
    </p>
  `,
  standalone: true
})
export class UiTextLocationComponent {
  readonly location = input<string>('');
}
