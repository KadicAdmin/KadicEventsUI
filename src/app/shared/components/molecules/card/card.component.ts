import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <p-card 
      [header]="header()" 
      [subheader]="subheader()"
      [class]="customClass()"
    >
      @if (headerTemplate()) {
        <ng-template pTemplate="header">
          <ng-content select="[slot=header]"></ng-content>
        </ng-template>
      }
      
      <ng-content></ng-content>
      
      @if (footerTemplate()) {
        <ng-template pTemplate="footer">
          <ng-content select="[slot=footer]"></ng-content>
        </ng-template>
      }
    </p-card>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class CardComponent {
  // Inputs
  readonly header = input<string>('');
  readonly subheader = input<string>('');
  readonly headerTemplate = input<boolean>(false);
  readonly footerTemplate = input<boolean>(false);
  readonly customClass = input<string>('');
}
