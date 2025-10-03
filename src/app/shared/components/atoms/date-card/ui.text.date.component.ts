import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-text-date',
  template: ` 
    <p class="text-sm text-gray-600 mt-1">
      {{ date() ? formatDate(date()!) : 'Fecha no disponible' }}
    </p> 
  `,
  standalone: true
})
export class UiTextDateComponent {
  readonly date = input<Date | null>(null);

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
