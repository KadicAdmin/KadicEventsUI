import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'report-event',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="text-center">
        <i class="pi pi-flag text-2xl text-gray-400 mb-3"></i>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          ¿Hay algún problema con este evento?
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          Si encuentras información incorrecta, contenido inapropiado o algún otro problema, 
          puedes reportarlo para que nuestro equipo lo revise.
        </p>
        
        <p-button 
          label="Reportar Evento"
          icon="pi pi-exclamation-triangle"
          [outlined]="true"
          severity="danger"
          size="small"
          (onClick)="onReport()" />
      </div>
    </div>
  `
})
export class ReportEventComponent {
  readonly reportClicked = output<void>();

  onReport(): void {
    this.reportClicked.emit();
  }
}