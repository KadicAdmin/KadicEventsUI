import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'info-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-start gap-3 mb-4">
        @if (icon()) {
          <div class="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <i [class]="icon()" class="text-blue-600"></i>
          </div>
        }
        
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            {{ title() }}
          </h3>
          
          @if (subtitle()) {
            <p class="text-sm text-gray-600 mb-3">
              {{ subtitle() }}
            </p>
          }
        </div>
      </div>
      
      <div class="content">
        <ng-content />
      </div>
    </div>
  `
})
export class InfoCardComponent {
  readonly icon = input<string>('');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
}