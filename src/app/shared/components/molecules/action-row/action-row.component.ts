import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export interface ActionButton {
  label: string;
  icon?: string;
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger';
  outlined?: boolean;
  disabled?: boolean;
  action: () => void;
}

@Component({
  selector: 'action-row',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="flex items-center gap-3 flex-wrap">
      @for (action of actions(); track action.label) {
        <p-button 
          [label]="action.label"
          [icon]="action.icon"
          [severity]="action.severity || 'secondary'"
          [outlined]="action.outlined !== false"
          [disabled]="action.disabled"
          size="small"
          (onClick)="action.action()" />
      }
    </div>
  `,
})
export class ActionRowComponent {
  readonly actions = input<ActionButton[]>([]);
}
