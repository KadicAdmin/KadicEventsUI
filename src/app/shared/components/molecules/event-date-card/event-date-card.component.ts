import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'app-event-date-card',
    standalone: true,
    imports: [CommonModule, ButtonModule, ChipModule],
    template: `
    <div class="group relative bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200">
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">
            {{ title() || 'Sin título' }}
          </h3>
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <i class="pi pi-calendar text-xs"></i>
            <span>{{ date() | date: 'dd MMM yyyy' }}</span>
          </div>
        </div>
        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary"
            size="small" (onClick)="onEdit.emit()" />
          <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
            size="small" (onClick)="onDelete.emit()" />
        </div>
      </div>
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ description() || 'Sin descripción' }}
      </p>
      <div class="flex gap-2">
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white text-xs text-gray-600">
          <i class="pi pi-map-marker text-xs"></i>
          {{ locationCount() }}
        </span>
      </div>
    </div>
  `,
})
export class EventDateCardComponent {
    readonly title = input<string>();
    readonly date = input<Date | string>();
    readonly description = input<string>();
    readonly locationCount = input<number>(0);
    readonly onEdit = output<void>();
    readonly onDelete = output<void>();
}

