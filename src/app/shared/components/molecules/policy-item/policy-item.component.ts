import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'policy-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 rounded-lg p-4">
      <div class="flex items-start justify-between mb-2">
        <h5 class="text-base font-semibold text-gray-900 mb-1">
          {{ title() }}
        </h5>
        
        @if (chipText()) {
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {{ chipText() }}
          </span>
        }
      </div>
      
      <p class="text-sm text-gray-600 leading-relaxed">
        {{ description() }}
      </p>
    </div>
  `
})
export class PolicyItemComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly chipText = input<string>('');
}