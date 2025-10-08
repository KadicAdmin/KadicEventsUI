import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-talk-card',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
    <div class="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
      <div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
        @if (imageUrl()) {
        <img [src]="imageUrl()" [alt]="title()" class="w-full h-full rounded-lg object-cover" />
        } @else {
        <i class="pi pi-microphone text-xl text-pink-600"></i>
        }
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-gray-900 mb-1 line-clamp-1">
          {{ title() || 'Sin título' }}
        </h3>
        <p class="text-sm text-gray-600 line-clamp-1 mb-1">
          {{ description() || 'Sin descripción' }}
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <i class="pi pi-clock"></i>
          <span>{{ duration() }} min</span>
        </div>
      </div>
      <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary"
          size="small" (onClick)="onEdit.emit()" />
        <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
          size="small" (onClick)="onDelete.emit()" />
      </div>
    </div>
  `,
})
export class TalkCardComponent {
    readonly title = input<string>();
    readonly description = input<string>();
    readonly duration = input<number>(0);
    readonly imageUrl = input<string>();
    readonly onEdit = output<void>();
    readonly onDelete = output<void>();
}

