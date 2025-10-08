import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-section-header',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <div [class]="'w-10 h-10 rounded-xl flex items-center justify-center ' + bgColor()">
          <i [class]="'pi ' + icon() + ' text-xl ' + iconColor()"></i>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ title() }}</h2>
          @if (subtitle()) {
          <p class="text-sm text-gray-500">{{ subtitle() }}</p>
          }
        </div>
      </div>
      @if (buttonLabel()) {
      <p-button 
        [label]="buttonLabel()!" 
        [icon]="buttonIcon()" 
        (onClick)="onButtonClick.emit()" 
        [outlined]="true" 
        size="small" />
      }
    </div>
  `,
})
export class SectionHeaderComponent {
    readonly icon = input.required<string>();
    readonly title = input.required<string>();
    readonly subtitle = input<string>();
    readonly bgColor = input<string>('bg-blue-50');
    readonly iconColor = input<string>('text-blue-600');
    readonly buttonLabel = input<string>();
    readonly buttonIcon = input<string>('pi pi-plus');
    readonly onButtonClick = output<void>();
}

