import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatItem {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'stat-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 gap-4">
      @for (stat of stats(); track stat.label) {
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            @if (stat.icon) {
              <i [class]="stat.icon" class="text-gray-500"></i>
            }
            <span class="text-sm text-gray-600">
              {{ stat.label }}
            </span>
          </div>
          
          <span class="text-sm font-semibold text-gray-900">
            {{ stat.value }}
          </span>
        </div>
      }
    </div>
  `
})
export class StatListComponent {
  readonly stats = input<StatItem[]>([]);
}