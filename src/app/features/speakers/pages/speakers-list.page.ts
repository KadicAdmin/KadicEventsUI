import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speakers-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Speakers Management</h1>
      <p>Speakers list coming soon...</p>
    </div>
  `
})
export class SpeakersListPage {}
