import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Event Details</h1>
      <p>Event details view coming soon...</p>
    </div>
  `
})
export class EventDetailsPage {}
