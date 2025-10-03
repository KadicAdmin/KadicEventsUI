import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCtaBarComponent } from '../../molecules/event-cta-bar/event-cta-bar.component';
import { OrganizerMiniComponent } from '../../molecules/organizer-mini/organizer-mini.component';
import { Slideshows } from '../slideshows/slideshows';
import { ImgProps } from '@core/models/core.models';

@Component({
    selector: 'event-hero',
    standalone: true,
    imports: [CommonModule, EventCtaBarComponent, OrganizerMiniComponent, Slideshows],
    template: `
    <div class="relative bg-white rounded-lg overflow-hidden shadow-lg">
      <!-- Hero Slideshow -->
      <div class="relative">
        @if (slideshowImages() && slideshowImages().length > 0) {
          <app-slideshows 
            [images]="slideshowImages()"
            height="400px"
            [showTitle]="false"
            [showDescription]="false"
            [showCounter]="false"
            [showIndicators]="true"
            [autoPlay]="true"
            [transitionInterval]="4000" />
        } @else {
          <div class="h-64 md:h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <i class="pi pi-image text-6xl text-gray-400"></i>
          </div>
        }
        
        <!-- Badge overlay -->
        @if (badgeText()) {
          <div class="absolute top-4 right-4 z-10">
            <span [class]="getBadgeClasses()">
              {{ badgeText() }}
            </span>
          </div>
        }
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <!-- Title and Description -->
        <div class="mb-6">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">
            {{ title() }}
          </h1>
          
          @if (description()) {
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ description() }}
            </p>
          }
        </div>
        
        <!-- Organizer Info -->
        @if (organizerName()) {
          <div class="mb-6">
            <organizer-mini 
              [name]="organizerName()"
              [avatarUrl]="organizerAvatarUrl()"
              [followerCount]="organizerFollowerCount()"
              [isFollowing]="isFollowingOrganizer()"
              (followClicked)="onFollowOrganizer()" />
          </div>
        }
        
        <!-- CTA Bar -->
        <event-cta-bar 
          [price]="price()"
          [currency]="currency()"
          [badgeText]="priceBadgeText()"
          [badgeSeverity]="priceBadgeSeverity()"
          (buyClicked)="onBuyTickets()"
          (shareClicked)="onShareEvent()"
          (saveClicked)="onSaveEvent()" />
      </div>
    </div>
  `
})
export class EventHeroComponent {
    readonly title = input<string>('');
    readonly description = input<string>('');
    readonly slideshowImages = input<ImgProps[]>([]);
    readonly badgeText = input<string>('');
    readonly badgeSeverity = input<'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger'>('warn');

    readonly organizerName = input<string>('');
    readonly organizerAvatarUrl = input<string>('');
    readonly organizerFollowerCount = input<number>(0);
    readonly isFollowingOrganizer = input<boolean>(false);

    readonly price = input<number>(0);
    readonly currency = input<string>('$');
    readonly priceBadgeText = input<string>('');
    readonly priceBadgeSeverity = input<'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger'>('warn');

    readonly buyTicketsClicked = output<void>();
    readonly shareEventClicked = output<void>();
    readonly saveEventClicked = output<void>();
    readonly followOrganizerClicked = output<void>();

    onBuyTickets(): void {
        this.buyTicketsClicked.emit();
    }

    onShareEvent(): void {
        this.shareEventClicked.emit();
    }

    onSaveEvent(): void {
        this.saveEventClicked.emit();
    }

    onFollowOrganizer(): void {
        this.followOrganizerClicked.emit();
    }

    getBadgeClasses(): string {
        const severityMap = {
            primary: 'bg-blue-100 text-blue-800',
            secondary: 'bg-gray-100 text-gray-800',
            success: 'bg-green-100 text-green-800',
            info: 'bg-blue-100 text-blue-800',
            warn: 'bg-yellow-100 text-yellow-800',
            danger: 'bg-red-100 text-red-800'
        };

        return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityMap[this.badgeSeverity()]}`;
    }
}