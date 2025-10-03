import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChipVariant = 'default' | 'outlined' | 'filled';

@Component({
  selector: 'ui-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="getChipClasses()"
      (click)="onClick()"
      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors">
      <ng-content />
    </span>
  `,
})
export class UiChipComponent {
  readonly variant = input<ChipVariant>('default');
  readonly customClass = input<string>('');
  readonly clickable = input<boolean>(false);

  readonly clicked = output<void>();

  onClick(): void {
    if (this.clickable()) {
      this.clicked.emit();
    }
  }

  getChipClasses(): string {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors';
    const variantClasses = this.getVariantClasses();
    const clickableClasses = this.clickable() ? 'cursor-pointer hover:opacity-80' : '';
    const customClasses = this.customClass();
    
    return `${baseClasses} ${variantClasses} ${clickableClasses} ${customClasses}`.trim();
  }

  private getVariantClasses(): string {
    const variantMap: Record<ChipVariant, string> = {
      default: 'bg-gray-100 text-gray-800',
      outlined: 'border border-gray-300 text-gray-700 bg-transparent',
      filled: 'bg-blue-500 text-white'
    };
    
    return variantMap[this.variant()];
  }
}
