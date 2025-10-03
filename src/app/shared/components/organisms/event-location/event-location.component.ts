import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventMetaItemComponent } from '../../molecules/event-meta-item/event-meta-item.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'event-location',
    standalone: true,
    imports: [CommonModule, ButtonModule, ChipModule, DividerModule, CardModule],
    template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-map-marker text-2xl text-blue-600"></i>
        <h3 class="text-2xl font-bold text-gray-900">Ubicación</h3>
        @if (isVirtual()) {
          <p-chip label="Virtual" icon="pi pi-video" styleClass="bg-blue-100 text-blue-800" />
        } @else {
          <p-chip label="Presencial" icon="pi pi-building" styleClass="bg-green-100 text-green-800" />
        }
      </div>
      
      @if (isVirtual()) {
        <!-- Virtual Event -->
        <p-card class="mb-4">
          <ng-template pTemplate="header">
            <div class="flex items-center gap-3 p-4 bg-blue-50">
              <i class="pi pi-video text-blue-600"></i>
              <div>
                <h4 class="font-bold text-blue-900">Evento Virtual</h4>
                <p class="text-sm text-blue-700">Este evento se realizará en línea</p>
              </div>
            </div>
          </ng-template>
          
          <div class="space-y-4">
            @if (virtualPlatform()) {
              <div class="flex items-center gap-3 p-3 bg-blue-25 rounded-lg">
                <i class="pi pi-link text-blue-600"></i>
                <div>
                  <p class="font-semibold text-gray-900">Plataforma</p>
                  <p class="text-sm text-gray-600">{{ virtualPlatform() }}</p>
                </div>
              </div>
            }
            
            @if (virtualLink()) {
              <div class="space-y-2">
                <p class="text-sm font-medium text-gray-700">Enlace del evento:</p>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <a 
                    [href]="virtualLink()" 
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 underline break-all flex-1">
                    {{ virtualLink() }}
                  </a>
                  <p-button 
                    icon="pi pi-external-link" 
                    [text]="true" 
                    size="small"
                    (onClick)="openLink(virtualLink()!)" />
                </div>
              </div>
            }
            
            <div class="flex gap-2 mt-4">
              <p-button 
                label="Agregar a Calendario" 
                icon="pi pi-calendar-plus" 
                size="small"
                [outlined]="true" />
              <p-button 
                label="Compartir Enlace" 
                icon="pi pi-share-alt" 
                size="small"
                [outlined]="true" />
            </div>
          </div>
        </p-card>
      } @else {
        <!-- Physical Event -->
        <div class="space-y-4">
          <!-- Address Card -->
          <p-card>
            <ng-template pTemplate="header">
              <div class="flex items-center gap-3 p-4 bg-green-50">
                <i class="pi pi-map-marker text-green-600"></i>
                <div>
                  <h4 class="font-bold text-green-900">Dirección</h4>
                  <p class="text-sm text-green-700">{{ fullAddress() }}</p>
                </div>
              </div>
            </ng-template>
            
            <div class="space-y-3">
              @if (venueName()) {
                <div class="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <i class="pi pi-building text-gray-600"></i>
                  <div>
                    <p class="font-medium text-gray-900">{{ venueName() }}</p>
                    <p class="text-sm text-gray-600">Lugar del evento</p>
                  </div>
                </div>
              }
              
              <div class="flex gap-2">
                <p-button 
                  label="Ver en Google Maps" 
                  icon="pi pi-map" 
                  size="small"
                  [outlined]="true" />
                <p-button 
                  label="Direcciones" 
                  icon="pi pi-directions" 
                  size="small"
                  [outlined]="true" />
              </div>
            </div>
          </p-card>
          
          <!-- Transportation Info -->
          @if (parkingInfo() || publicTransport()) {
            <p-card>
              <ng-template pTemplate="header">
                <div class="flex items-center gap-3 p-4 bg-purple-50">
                  <i class="pi pi-car text-purple-600"></i>
                  <h4 class="font-bold text-purple-900">Cómo Llegar</h4>
                </div>
              </ng-template>
              
              <div class="space-y-3">
                @if (parkingInfo()) {
                  <div class="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <i class="pi pi-car text-gray-600"></i>
                    <div>
                      <p class="font-medium text-gray-900">Estacionamiento</p>
                      <p class="text-sm text-gray-600">{{ parkingInfo() }}</p>
                    </div>
                  </div>
                }
                
                @if (publicTransport()) {
                  <div class="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <i class="pi pi-bus text-gray-600"></i>
                    <div>
                      <p class="font-medium text-gray-900">Transporte Público</p>
                      <p class="text-sm text-gray-600">{{ publicTransport() }}</p>
                    </div>
                  </div>
                }
              </div>
            </p-card>
          }
          
          <!-- Interactive Map -->
          @if (showMap()) {
            <p-card>
              <ng-template pTemplate="header">
                <div class="flex items-center gap-3 p-4 bg-indigo-50">
                  <i class="pi pi-map text-indigo-600"></i>
                  <h4 class="font-bold text-indigo-900">Mapa Interactivo</h4>
                </div>
              </ng-template>
              
              <div class="relative">
                <div class="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <i class="pi pi-map text-4xl text-indigo-400 mb-3"></i>
                    <p class="text-sm text-indigo-600 font-medium">
                      Mapa interactivo de {{ fullAddress() }}
                    </p>
                    <p class="text-xs text-indigo-500 mt-2">
                      Haz clic para abrir en Google Maps
                    </p>
                  </div>
                </div>
                
                <!-- Map Controls -->
                <div class="absolute top-3 right-3 flex gap-2">
                  <p-button 
                    icon="pi pi-search-plus" 
                    [text]="true" 
                    size="small"
                    [rounded]="true"
                    styleClass="bg-white shadow-md" />
                  <p-button 
                    icon="pi pi-search-minus" 
                    [text]="true" 
                    size="small"
                    [rounded]="true"
                    styleClass="bg-white shadow-md" />
                </div>
              </div>
            </p-card>
          }
        </div>
      }
    </div>
  `
})
export class EventLocationComponent {
    readonly isVirtual = input<boolean>(false);
    readonly fullAddress = input<string>('');
    readonly venueName = input<string>('');
    readonly virtualPlatform = input<string>('');
    readonly virtualLink = input<string>('');
    readonly parkingInfo = input<string>('');
    readonly publicTransport = input<string>('');
    readonly showMap = input<boolean>(true);

    openLink(url: string): void {
        window.open(url, '_blank');
    }
}