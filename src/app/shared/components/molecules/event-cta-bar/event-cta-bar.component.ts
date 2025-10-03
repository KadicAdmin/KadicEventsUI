import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'event-cta-bar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex items-baseline gap-1">
            <span class="currency text-xl font-bold">{{ currency() }}</span>
            <span class="amount text-xl font-bold">{{ formatPrice() }}</span>
          </div>
          
          @if (badgeText()) {
            <span [class]="getBadgeClasses()">
              {{ badgeText() }}
            </span>
          }
        </div>
        
        <div class="flex items-center gap-3">
          <p-button 
            icon="pi pi-share-alt"
            [text]="true"
            severity="secondary"
            size="small"
            (onClick)="onShare()"
            pTooltip="Compartir evento" />
          
          <p-button 
            icon="pi pi-bookmark"
            [text]="true"
            severity="secondary"
            size="small"
            (onClick)="onSave()"
            pTooltip="Guardar evento" />
          
          <p-button 
            label="Comprar Entradas"
            icon="pi pi-shopping-cart"
            (onClick)="onBuy()"
            class="px-6" />
        </div>
      </div>
    </div>
  `
})
export class EventCtaBarComponent {
  readonly price = input<number>(0);
  readonly currency = input<string>('$');
  readonly badgeText = input<string>('');
  readonly badgeSeverity = input<'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger'>('warn');

  readonly buyClicked = output<void>();
  readonly shareClicked = output<void>();
  readonly saveClicked = output<void>();

  onBuy(): void {
    this.buyClicked.emit();
  }

  onShare(): void {
    this.shareClicked.emit();
  }

  onSave(): void {
    this.saveClicked.emit();
  }

  formatPrice(): string {
    const amount = this.price();
    if (amount === 0) return 'Gratis';
    
    return amount.toLocaleString('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

  getBadgeClasses(): string {
    const severityMap = {
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      info: 'bg-blue-100 text-blue-800',
      warn: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800'
    };
    
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityMap[this.badgeSeverity()]}`;
  }
}