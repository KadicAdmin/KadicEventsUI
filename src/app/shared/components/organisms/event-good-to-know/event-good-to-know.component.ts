import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatListComponent, StatItem } from '../../molecules/stat-list/stat-list.component';
import { PolicyItemComponent } from '../../molecules/policy-item/policy-item.component';

export interface Policy {
    title: string;
    description: string;
    chipText?: string;
}

@Component({
    selector: 'event-good-to-know',
    standalone: true,
    imports: [CommonModule, StatListComponent],
    template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-info-circle text-2xl text-blue-600"></i>
        <h3 class="text-2xl font-bold text-gray-900">Información Importante</h3>
      </div>
      
      <!-- Event Statistics -->
      @if (stats().length > 0) {
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="pi pi-chart-bar text-blue-600"></i>
            Estadísticas del Evento
          </h4>
          <stat-list [stats]="stats()" />
        </div>
      }
      
      <!-- Capacity Progress -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-3">Capacidad</h4>
        <div class="space-y-3">
            <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Registrados</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">{{ getRegisteredCount() }} / {{ getMaxCapacity() }}</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" [class]="getCapacityBadgeClass()">
                {{ getCapacityPercentage() }}%
              </span>
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div class="bg-blue-600 h-3 rounded-full" [style.width.%]="getCapacityPercentage()"></div>
          </div>
          <div class="flex gap-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <i class="pi pi-users mr-1"></i>
              Quedan {{ getRemainingSpots() }} cupos
            </span>
            @if (isAlmostFull()) {
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                <i class="pi pi-exclamation-triangle mr-1"></i>
                ¡Pocos cupos disponibles!
              </span>
            }
          </div>
        </div>
      </div>
      
      <!-- Policies Accordion -->
      @if (policies().length > 0) {
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="pi pi-shield text-green-600"></i>
            Políticas y Términos
          </h4>
          
          <div class="space-y-3">
            @for (policy of policies(); track policy.title) {
              <div class="border border-gray-200 rounded-lg">
                <div class="p-4">
                  <h5 class="font-semibold text-gray-900 mb-2">{{ policy.title }}</h5>
                  <p class="text-gray-700 mb-2">{{ policy.description }}</p>
                  @if (policy.chipText) {
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {{ policy.chipText }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }
      
      <!-- Event Requirements -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="pi pi-check-circle text-green-600"></i>
          Requisitos del Evento
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <i class="pi pi-id-card text-blue-600"></i>
              <div>
                <p class="font-medium text-gray-900">Identificación</p>
                <p class="text-sm text-gray-600">Cédula o pasaporte válido</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <i class="pi pi-mobile text-green-600"></i>
              <div>
                <p class="font-medium text-gray-900">Confirmation</p>
                <p class="text-sm text-gray-600">Email de confirmación</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <i class="pi pi-clock text-purple-600"></i>
              <div>
                <p class="font-medium text-gray-900">Puntualidad</p>
                <p class="text-sm text-gray-600">Llegar 15 min antes</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <i class="pi pi-ban text-orange-600"></i>
              <div>
                <p class="font-medium text-gray-900">Restricciones</p>
                <p class="text-sm text-gray-600">No se permite comida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      @if (stats().length === 0 && policies().length === 0) {
        <div class="text-center py-8">
          <i class="pi pi-info-circle text-3xl text-gray-400 mb-2"></i>
          <p class="text-sm text-gray-500">
            No hay información adicional disponible
          </p>
        </div>
      }
      
      <!-- Custom Styles -->
      <style>
        :host ::ng-deep .custom-accordion .p-accordion-header-link {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        :host ::ng-deep .custom-accordion .p-accordion-content {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: none;
        }
      </style>
    </div>
  `
})
export class EventGoodToKnowComponent {
    readonly stats = input<StatItem[]>([]);
    readonly policies = input<Policy[]>([]);

    getRegisteredCount(): number {
        // Mock data - in real app this would come from the event data
        return 287;
    }

    getMaxCapacity(): number {
        // Mock data - in real app this would come from the event data
        return 500;
    }

    getCapacityPercentage(): number {
        return Math.round((this.getRegisteredCount() / this.getMaxCapacity()) * 100);
    }

    getCapacitySeverity(): 'success' | 'info' | 'warn' | 'danger' {
        const percentage = this.getCapacityPercentage();
        if (percentage >= 90) return 'danger';
        if (percentage >= 75) return 'warn';
        if (percentage >= 50) return 'info';
        return 'success';
    }

    getRemainingSpots(): number {
        return this.getMaxCapacity() - this.getRegisteredCount();
    }

    isAlmostFull(): boolean {
        return this.getCapacityPercentage() >= 80;
    }

    getCapacityBadgeClass(): string {
        const percentage = this.getCapacityPercentage();
        if (percentage >= 90) return 'bg-red-100 text-red-800';
        if (percentage >= 75) return 'bg-orange-100 text-orange-800';
        if (percentage >= 50) return 'bg-blue-100 text-blue-800';
        return 'bg-green-100 text-green-800';
    }
}