import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Create Event</h1>
      <p>Event creation form coming soon...</p>
    </div>
  `
})
export class EventCreatePage {}
