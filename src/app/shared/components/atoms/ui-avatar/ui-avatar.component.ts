import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getAvatarClasses()">
      @if (imageUrl()) {
        <img 
          [src]="imageUrl()" 
          [alt]="alt()"
          class="w-full h-full object-cover rounded-full" />
      } @else {
        <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
          <span class="font-semibold">{{ getInitials() }}</span>
        </div>
      }
    </div>
  `,
})
export class UiAvatarComponent {
  readonly imageUrl = input<string>('');
  readonly alt = input<string>('Avatar');
  readonly name = input<string>('');
  readonly size = input<AvatarSize>('medium');
  readonly customClass = input<string>('');

  getAvatarClasses(): string {
    const baseClasses = 'flex-shrink-0 overflow-hidden';
    const sizeClasses = this.getSizeClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${sizeClasses} ${customClasses}`.trim();
  }

  private getSizeClasses(): string {
    const sizeMap: Record<AvatarSize, string> = {
      small: 'w-8 h-8',
      medium: 'w-12 h-12',
      large: 'w-16 h-16',
      xlarge: 'w-24 h-24'
    };
    
    return sizeMap[this.size()];
  }

  getInitials(): string {
    if (!this.name()) return '?';
    
    return this.name()
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
