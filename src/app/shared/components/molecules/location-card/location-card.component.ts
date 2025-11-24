import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-location-card',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
      <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
        <i class="pi pi-map-marker text-blue-600"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-gray-900 mb-1">
          {{ name() || 'Sin nombre' }}
        </h4>
        <p class="text-sm text-gray-600 line-clamp-1">
          {{ address() || 'Sin dirección' }}
        </p>
        @if (hasCoordinates()) {
        <p class="text-xs text-gray-500 mt-1">
          <i class="pi pi-compass text-xs mr-1"></i>
          {{ latitude() }}, {{ longitude() }}
        </p>
        }
      </div>
      <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
        size="small" (onClick)="onDelete.emit()" />
    </div>
  `,
})
export class LocationCardComponent {
    readonly name = input<string>();
    readonly address = input<string>();
    readonly latitude = input<number | null>();
    readonly longitude = input<number | null>();
    readonly onDelete = output<void>();

    hasCoordinates() {
        return this.latitude() != null && this.longitude() != null;
    }
}

