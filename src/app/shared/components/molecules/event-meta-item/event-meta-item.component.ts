import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'event-meta-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-start gap-3">
      @if (icon()) {
        <div class="flex-shrink-0 mt-1">
          <i [class]="icon()" class="text-gray-500"></i>
        </div>
      }
      
      <div class="flex-1">
        <h4 class="text-base font-semibold text-gray-900 mb-1">
          {{ title() }}
        </h4>
        
        <p class="text-sm text-gray-600 leading-relaxed">
          {{ subtitle() }}
        </p>
      </div>
    </div>
  `
})
export class EventMetaItemComponent {
  readonly icon = input<string>('');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
}