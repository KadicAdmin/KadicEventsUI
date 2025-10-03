import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="getDividerClasses()"
      role="separator">
      @if (text()) {
        <span class="px-3 bg-white text-gray-500 text-sm">{{ text() }}</span>
      }
    </div>
  `,
})
export class UiDividerComponent {
  readonly text = input<string>('');
  readonly orientation = input<DividerOrientation>('horizontal');
  readonly customClass = input<string>('');

  getDividerClasses(): string {
    const baseClasses = 'flex items-center';
    const orientationClasses = this.getOrientationClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${orientationClasses} ${customClasses}`.trim();
  }

  private getOrientationClasses(): string {
    const orientationMap: Record<DividerOrientation, string> = {
      horizontal: 'w-full border-t border-gray-200',
      vertical: 'h-full border-l border-gray-200'
    };
    
    return orientationMap[this.orientation()];
  }
}
