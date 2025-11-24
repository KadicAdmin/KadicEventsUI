import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

@Component({
  selector: 'ui-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (level()) {
      @case ('h1') {
        <h1 [class]="getHeadingClasses()">
          <ng-content />
        </h1>
      }
      @case ('h2') {
        <h2 [class]="getHeadingClasses()">
          <ng-content />
        </h2>
      }
      @case ('h3') {
        <h3 [class]="getHeadingClasses()">
          <ng-content />
        </h3>
      }
      @case ('h4') {
        <h4 [class]="getHeadingClasses()">
          <ng-content />
        </h4>
      }
      @case ('h5') {
        <h5 [class]="getHeadingClasses()">
          <ng-content />
        </h5>
      }
      @case ('h6') {
        <h6 [class]="getHeadingClasses()">
          <ng-content />
        </h6>
      }
    }
  `,
})
export class UiHeadingComponent {
  readonly level = input<HeadingLevel>('h2');
  readonly customClass = input<string>('');

  getHeadingClasses(): string {
    const baseClasses = 'font-bold text-gray-900';
    const levelClasses = this.getLevelClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${levelClasses} ${customClasses}`.trim();
  }

  private getLevelClasses(): string {
    const levelMap: Record<HeadingLevel, string> = {
      h1: 'text-4xl mb-4',
      h2: 'text-3xl mb-3',
      h3: 'text-2xl mb-3',
      h4: 'text-xl mb-2',
      h5: 'text-lg mb-2',
      h6: 'text-base mb-2'
    };
    
    return levelMap[this.level()];
  }
}
