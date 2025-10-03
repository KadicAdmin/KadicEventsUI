import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StatListComponent, StatItem } from '../../molecules/stat-list/stat-list.component';

export interface SocialLink {
  platform: string;
  url: string;
}

@Component({
  selector: 'organizer-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, StatListComponent],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
      <div class="text-center mb-6">
        <div class="flex-shrink-0 w-24 h-24 mx-auto mb-4 overflow-hidden">
          @if (avatarUrl()) {
            <img 
              [src]="avatarUrl()" 
              [alt]="name()"
              class="w-full h-full object-cover rounded-full" />
          } @else {
            <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
              <span class="font-semibold text-lg">{{ getInitials() }}</span>
            </div>
          }
        </div>
        
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          {{ name() }}
        </h3>
        
        @if (bio()) {
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ bio() }}
          </p>
        }
      </div>
      
      <!-- Stats -->
      @if (stats().length > 0) {
        <div class="mb-6">
          <stat-list [stats]="stats()" />
        </div>
      }
      
      <!-- Action Buttons -->
      <div class="space-y-3">
        <p-button 
          label="Contactar Organizador"
          icon="pi pi-envelope"
          [outlined]="true"
          severity="secondary"
          class="w-full"
          (onClick)="onContact()" />
        
        @if (!isFollowing()) {
          <p-button 
            label="Seguir"
            icon="pi pi-user-plus"
            class="w-full"
            (onClick)="onFollow()" />
        } @else {
          <p-button 
            label="Dejar de Seguir"
            icon="pi pi-user-minus"
            [outlined]="true"
            severity="secondary"
            class="w-full"
            (onClick)="onUnfollow()" />
        }
      </div>
      
      <!-- Social Links -->
      @if (socialLinks().length > 0) {
        <div class="mt-6 pt-4 border-t border-gray-200">
          <h5 class="text-sm font-semibold text-gray-900 mb-3">Redes Sociales</h5>
          <div class="flex justify-center gap-3">
            @for (link of socialLinks(); track link.platform) {
              <a 
                [href]="link.url"
                target="_blank"
                class="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                [title]="link.platform">
                <i [class]="getSocialIcon(link.platform)" class="text-gray-600"></i>
              </a>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class OrganizerCardComponent {
  readonly name = input<string>('');
  readonly bio = input<string>('');
  readonly avatarUrl = input<string>('');
  readonly isFollowing = input<boolean>(false);
  readonly stats = input<StatItem[]>([]);
  readonly socialLinks = input<SocialLink[]>([]);

  readonly contactClicked = output<void>();
  readonly followClicked = output<void>();
  readonly unfollowClicked = output<void>();

  onContact(): void {
    this.contactClicked.emit();
  }

  onFollow(): void {
    this.followClicked.emit();
  }

  onUnfollow(): void {
    this.unfollowClicked.emit();
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

  getSocialIcon(platform: string): string {
    const iconMap: Record<string, string> = {
      facebook: 'pi pi-facebook',
      twitter: 'pi pi-twitter',
      instagram: 'pi pi-instagram',
      linkedin: 'pi pi-linkedin',
      youtube: 'pi pi-youtube',
      website: 'pi pi-globe'
    };
    
    return iconMap[platform.toLowerCase()] || 'pi pi-link';
  }
}