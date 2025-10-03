import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventMetaItemComponent } from '../../molecules/event-meta-item/event-meta-item.component';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'event-datetime',
    standalone: true,
    imports: [CommonModule, DividerModule],
    template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-calendar text-2xl text-blue-600"></i>
        <h3 class="text-2xl font-bold text-gray-900">Fecha y Hora</h3>
      </div>
      
      <!-- Calendar Preview -->
      <div class="mb-6">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <i class="pi pi-calendar text-3xl text-blue-600 mb-2"></i>
          <p class="text-lg font-semibold text-blue-900">{{ formatDate(startDate()) }}</p>
          <p class="text-sm text-blue-700">{{ formatTimeRange(startDate(), endDate()) }}</p>
        </div>
      </div>

      <p-divider />

      <!-- Event Details -->
      <div class="space-y-4 mt-6">
        <!-- Date Range -->
        <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <i class="pi pi-calendar text-blue-600"></i>
          <div>
            <p class="font-semibold text-gray-900">{{ formatDate(startDate()) }}</p>
            <p class="text-sm text-gray-600">{{ formatTimeRange(startDate(), endDate()) }}</p>
          </div>
        </div>
        
        <!-- Duration -->
        @if (duration()) {
          <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <i class="pi pi-stopwatch text-green-600"></i>
            <div>
              <p class="font-semibold text-gray-900">Duración del Evento</p>
              <p class="text-sm text-gray-600">{{ duration() }}</p>
            </div>
          </div>
        }
        
        <!-- Timezone -->
        @if (timezone()) {
          <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <i class="pi pi-clock text-purple-600"></i>
            <div>
              <p class="font-semibold text-gray-900">Zona Horaria</p>
              <p class="text-sm text-gray-600">{{ timezone() }}</p>
            </div>
          </div>
        }
        
        <!-- Recurrence -->
        @if (recurrence()) {
          <p-divider />
          <div class="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <i class="pi pi-refresh text-orange-600"></i>
            <div>
              <p class="font-semibold text-gray-900">Recurrencia</p>
              <p class="text-sm text-gray-600">{{ recurrence() }}</p>
            </div>
          </div>
        }
        
        <!-- Event Status -->
        <div class="flex items-center gap-3 mt-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" [class]="getStatusClass()">
            <i class="pi pi-check-circle mr-1"></i>
            {{ getEventStatus() }}
          </span>
          
          @if (isUpcoming()) {
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Próximo
            </span>
          }
        </div>
      </div>
    </div>
  `
})
export class EventDatetimeComponent {
    readonly startDate = input<Date | string>(new Date());
    readonly endDate = input<Date | string>(new Date());
    readonly timezone = input<string>('');
    readonly duration = input<string>('');
    readonly recurrence = input<string>('');

    formatDate(date: Date | string): string {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTimeRange(start: Date | string, end: Date | string): string {
        const startDate = typeof start === 'string' ? new Date(start) : start;
        const endDate = typeof end === 'string' ? new Date(end) : end;

        const startTime = startDate.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const endTime = endDate.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return `${startTime} - ${endTime}`;
    }

    getEventStatus(): string {
        const now = new Date();
        const eventStart = typeof this.startDate() === 'string' ? new Date(this.startDate()) : this.startDate();

        if (eventStart < now) {
            return 'Finalizado';
        } else if ((eventStart as Date).getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
            return 'Próximo';
        } else {
            return 'Programado';
        }
    }

    getStatusClass(): string {
        const status = this.getEventStatus();
        switch (status) {
            case 'Finalizado':
                return 'bg-red-100 text-red-800';
            case 'Próximo':
                return 'bg-orange-100 text-orange-800';
            case 'Programado':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    isUpcoming(): boolean {
        const now = new Date();
        const eventStart = typeof this.startDate() === 'string' ? new Date(this.startDate()) : this.startDate();
        return eventStart > now && (eventStart as Date).getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000;
    }
}