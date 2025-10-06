import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-empty-state',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
    <div class="text-center py-12">
      <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <i [class]="'pi ' + icon() + ' text-3xl text-gray-400'"></i>
      </div>
      <p class="text-gray-500 mb-4">{{ message() }}</p>
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
export class EmptyStateComponent {
    readonly icon = input.required<string>();
    readonly message = input.required<string>();
    readonly buttonLabel = input<string>();
    readonly buttonIcon = input<string>('pi pi-plus');
    readonly onButtonClick = output<void>();
}

