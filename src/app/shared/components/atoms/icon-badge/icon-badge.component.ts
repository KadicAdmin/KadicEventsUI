import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-icon-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="'w-' + size() + ' h-' + size() + ' rounded-xl flex items-center justify-center ' + bgColor()">
      <i [class]="'pi ' + icon() + ' text-' + iconSize() + ' ' + iconColor()"></i>
    </div>
  `,
})
export class IconBadgeComponent {
    readonly icon = input.required<string>();
    readonly bgColor = input<string>('bg-blue-50');
    readonly iconColor = input<string>('text-blue-600');
    readonly size = input<string>('10');
    readonly iconSize = input<string>('xl');
}

