import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/molecules/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <app-card 
          header="Events" 
          customClass="bg-blue-50 border-blue-200"
        >
          <div class="text-center">
            <i class="pi pi-calendar text-4xl text-blue-500 mb-2"></i>
            <p class="text-2xl font-bold text-blue-700">12</p>
            <p class="text-blue-600">Total Events</p>
          </div>
        </app-card>

        <app-card 
          header="Speakers" 
          customClass="bg-green-50 border-green-200"
        >
          <div class="text-center">
            <i class="pi pi-users text-4xl text-green-500 mb-2"></i>
            <p class="text-2xl font-bold text-green-700">8</p>
            <p class="text-green-600">Active Speakers</p>
          </div>
        </app-card>

        <app-card 
          header="Participants" 
          customClass="bg-purple-50 border-purple-200"
        >
          <div class="text-center">
            <i class="pi pi-user text-4xl text-purple-500 mb-2"></i>
            <p class="text-2xl font-bold text-purple-700">156</p>
            <p class="text-purple-600">Total Participants</p>
          </div>
        </app-card>
      </div>

      <div class="mt-8">
        <app-card header="Recent Activity">
          <p class="text-gray-600">Welcome to the Kadic Events Management System!</p>
          <p class="text-gray-600 mt-2">Use the navigation to manage events, speakers, and participants.</p>
        </app-card>
      </div>
    </div>
  `
})
export class DashboardPage {}
