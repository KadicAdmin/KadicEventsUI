import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'organizer-mini',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div class="flex-shrink-0 w-12 h-12 overflow-hidden">
        @if (avatarUrl()) {
          <img 
            [src]="avatarUrl()" 
            [alt]="name()"
            class="w-full h-full object-cover rounded-full" />
        } @else {
          <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
            <span class="font-semibold">{{ getInitials() }}</span>
          </div>
        }
      </div>
      
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-gray-900 truncate">
          {{ name() }}
        </p>
        
        @if (followerCount()) {
          <p class="text-sm text-gray-600">
            {{ formatFollowerCount() }} seguidores
          </p>
        }
      </div>
      
      <p-button 
        label="Seguir"
        [text]="true"
        size="small"
        severity="secondary"
        (onClick)="onFollow()"
        [disabled]="isFollowing()" />
    </div>
  `
})
export class OrganizerMiniComponent {
  readonly name = input<string>('');
  readonly avatarUrl = input<string>('');
  readonly followerCount = input<number>(0);
  readonly isFollowing = input<boolean>(false);

  readonly followClicked = output<void>();

  onFollow(): void {
    this.followClicked.emit();
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

  formatFollowerCount(): string {
    const count = this.followerCount();
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }
}