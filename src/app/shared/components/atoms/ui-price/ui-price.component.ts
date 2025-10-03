import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-price',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getPriceClasses()">
      @if (currency()) {
        <span class="currency">{{ currency() }}</span>
      }
      <span class="amount">{{ formatPrice() }}</span>
      @if (period()) {
        <span class="period text-sm opacity-75">/ {{ period() }}</span>
      }
    </div>
  `,
})
export class UiPriceComponent {
  readonly amount = input<number>(0);
  readonly currency = input<string>('$');
  readonly period = input<string>('');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly customClass = input<string>('');

  getPriceClasses(): string {
    const baseClasses = 'flex items-baseline gap-1';
    const sizeClasses = this.getSizeClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${sizeClasses} ${customClasses}`.trim();
  }

  private getSizeClasses(): string {
    const sizeMap = {
      small: 'text-lg font-semibold',
      medium: 'text-xl font-bold',
      large: 'text-2xl font-bold'
    };
    
    return sizeMap[this.size()];
  }

  formatPrice(): string {
    const amount = this.amount();
    if (amount === 0) return 'Gratis';
    
    return amount.toLocaleString('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
}
