import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="getBadgeClasses()"
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
      <ng-content />
    </span>
  `
})
export class UiBadgeComponent {
  readonly severity = input<BadgeSeverity>('primary');
  readonly customClass = input<string>('');

  getBadgeClasses(): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const severityClasses = this.getSeverityClasses();
    const customClasses = this.customClass();
    
    return `${baseClasses} ${severityClasses} ${customClasses}`.trim();
  }

  private getSeverityClasses(): string {
    const severityMap: Record<BadgeSeverity, string> = {
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      info: 'bg-blue-100 text-blue-800',
      warn: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800'
    };
    
    return severityMap[this.severity()];
  }
}
