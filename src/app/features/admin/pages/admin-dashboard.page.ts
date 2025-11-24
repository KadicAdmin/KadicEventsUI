import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Maintenance tables management coming soon...</p>
    </div>
  `
})
export class AdminDashboardPage {}
