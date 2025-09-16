import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, AnimateOnScroll, AvatarModule],
  templateUrl: './event-details.page.html',
  styles: [
    `
      :host {
        @keyframes slidedown-icon {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(20px);
          }

          100% {
            transform: translateY(0);
          }
        }

        .slidedown-icon {
          animation: slidedown-icon;
          animation-duration: 3s;
          animation-iteration-count: infinite;
        }

        .box {
          background-image: radial-gradient(
            var(--primary-300),
            var(--primary-600)
          );
          border-radius: 50% !important;
          color: var(--primary-color-text);
        }
      }
    `,
  ],
})
export class EventDetailsPage {}
