import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

export type ButtonVariant = 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger';
export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button
      [label]="label()"
      [icon]="icon()"
      [loading]="loading()"
      [disabled]="disabled()"
      [severity]="variant()"
      [size]="size()"
      [outlined]="outlined()"
      [text]="text()"
      [raised]="raised()"
      [rounded]="rounded()"
      (onClick)="handleClick()"
      [class]="customClass()"
    />
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  // Inputs using signals
  readonly label = input<string>('');
  readonly icon = input<string>('');
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly variant = input<ButtonVariant | undefined>(undefined);
  readonly size = input<ButtonSize | undefined>(undefined);
  readonly outlined = input<boolean>(false);
  readonly text = input<boolean>(false);
  readonly raised = input<boolean>(false);
  readonly rounded = input<boolean>(false);
  readonly customClass = input<string>('');

  // Output using signals
  readonly clicked = output<void>();

  handleClick(): void {
    this.clicked.emit();
  }
}
