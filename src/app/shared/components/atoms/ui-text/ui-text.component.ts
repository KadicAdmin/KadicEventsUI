import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TextSize = 'small' | 'medium' | 'large';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

@Component({
  selector: 'ui-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="getTextClasses()">
      <ng-content />
    </p>
  `,
})
export class UiTextComponent {
  readonly size = input<TextSize>('medium');
  readonly weight = input<TextWeight>('normal');
  readonly color = input<'primary' | 'secondary' | 'muted'>('primary');
  readonly customClass = input<string>('');

  getTextClasses(): string {
    const baseClasses = 'text-gray-900';
    const sizeClasses = this.getSizeClasses();
    const weightClasses = this.getWeightClasses();
    const colorClasses = this.getColorClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${sizeClasses} ${weightClasses} ${colorClasses} ${customClasses}`.trim();
  }

  private getSizeClasses(): string {
    const sizeMap: Record<TextSize, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };
    
    return sizeMap[this.size()];
  }

  private getWeightClasses(): string {
    const weightMap: Record<TextWeight, string> = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    };
    
    return weightMap[this.weight()];
  }

  private getColorClasses(): string {
    const colorMap = {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      muted: 'text-gray-500'
    };
    
    return colorMap[this.color()];
  }
}
