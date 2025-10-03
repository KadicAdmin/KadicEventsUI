import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonType = 'text' | 'rectangular' | 'circular' | 'card';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="getSkeletonClasses()"
      [style.width]="width()"
      [style.height]="height()">
    </div>
  `,
  styles: [`
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `]
})
export class UiSkeletonComponent {
  readonly type = input<SkeletonType>('text');
  readonly width = input<string>('100%');
  readonly height = input<string>('1rem');
  readonly customClass = input<string>('');

  getSkeletonClasses(): string {
    const baseClasses = 'skeleton';
    const typeClasses = this.getTypeClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${typeClasses} ${customClasses}`.trim();
  }

  private getTypeClasses(): string {
    const typeMap: Record<SkeletonType, string> = {
      text: 'rounded',
      rectangular: 'rounded-lg',
      circular: 'rounded-full',
      card: 'rounded-lg p-4'
    };
    
    return typeMap[this.type()];
  }
}
