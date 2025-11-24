import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

export interface Artist {
    name: string;
    role?: string;
    bio?: string;
}

@Component({
    selector: 'event-about',
    standalone: true,
    imports: [CommonModule, AvatarModule],
    template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-file-text text-2xl text-blue-600"></i>
        <h3 class="text-2xl font-bold text-gray-900">Acerca del Evento</h3>
      </div>
      
      @if (description()) {
        <div class="mb-6">
          <div class="prose prose-gray max-w-none">
            <p class="text-base text-gray-900 leading-relaxed mb-4">
              {{ description() }}
            </p>
            
            <!-- Event Highlights -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <i class="pi pi-users text-2xl text-blue-600 mb-2"></i>
                <p class="font-semibold text-gray-900">Networking</p>
                <p class="text-sm text-gray-600">Conecta con profesionales</p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <i class="pi pi-graduation-cap text-2xl text-green-600 mb-2"></i>
                <p class="font-semibold text-gray-900">Aprendizaje</p>
                <p class="text-sm text-gray-600">Conocimientos actualizados</p>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <i class="pi pi-lightbulb text-2xl text-purple-600 mb-2"></i>
                <p class="font-semibold text-gray-900">Innovación</p>
                <p class="text-sm text-gray-600">Tendencias del futuro</p>
              </div>
            </div>
          </div>
        </div>
      }
      
      <!-- Event Agenda -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="pi pi-list text-blue-600"></i>
          Agenda del Evento
        </h4>
        
        <div class="space-y-3">
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4">
              <h5 class="font-semibold text-gray-900 mb-2">09:00 - 09:30 - Registro y Bienvenida</h5>
              <p class="text-gray-700 mb-2">Recepción de participantes y entrega de materiales del evento.</p>
              <div class="flex gap-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Registro</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">30 min</span>
              </div>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4">
              <h5 class="font-semibold text-gray-900 mb-2">09:30 - 10:30 - Conferencia Principal</h5>
              <p class="text-gray-700 mb-2">Presentación sobre las últimas tendencias en tecnología y desarrollo.</p>
              <div class="flex gap-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Conferencia</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">60 min</span>
              </div>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4">
              <h5 class="font-semibold text-gray-900 mb-2">10:30 - 11:00 - Coffee Break</h5>
              <p class="text-gray-700 mb-2">Pausa para networking y refrigerios.</p>
              <div class="flex gap-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Break</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">30 min</span>
              </div>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4">
              <h5 class="font-semibold text-gray-900 mb-2">11:00 - 12:30 - Workshop Práctico</h5>
              <p class="text-gray-700 mb-2">Sesión práctica con ejercicios y casos de uso reales.</p>
              <div class="flex gap-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Workshop</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">90 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Speakers -->
      @if (artists().length > 0) {
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i class="pi pi-users text-blue-600"></i>
            Ponentes y Participantes
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @for (artist of artists(); track artist.name) {
              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p-avatar 
                  [label]="getInitials(artist.name)"
                  styleClass="bg-blue-600 text-white"
                  size="large"
                  shape="circle" />
                
                <div class="flex-1">
                  <h5 class="font-semibold text-gray-900 mb-1">{{ artist.name }}</h5>
                  @if (artist.role) {
                    <p class="text-sm text-blue-600 mb-2 font-medium">
                      {{ artist.role }}
                    </p>
                  }
                  @if (artist.bio) {
                    <p class="text-sm text-gray-600 leading-relaxed">
                      {{ artist.bio }}
                    </p>
                  }
                  
                  <div class="flex gap-2 mt-3">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Experto
                    </span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      10+ años
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
      
      <!-- What You'll Learn -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="pi pi-book text-green-600"></i>
          Lo Que Aprenderás
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <i class="pi pi-check-circle text-green-600"></i>
            <span class="text-gray-900">Fundamentos de la tecnología moderna</span>
          </div>
          <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <i class="pi pi-check-circle text-green-600"></i>
            <span class="text-gray-900">Mejores prácticas de desarrollo</span>
          </div>
          <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <i class="pi pi-check-circle text-green-600"></i>
            <span class="text-gray-900">Casos de uso reales</span>
          </div>
          <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <i class="pi pi-check-circle text-green-600"></i>
            <span class="text-gray-900">Networking profesional</span>
          </div>
        </div>
      </div>
      
      @if (!description() && artists().length === 0) {
        <div class="text-center py-8">
          <i class="pi pi-file-text text-3xl text-gray-400 mb-2"></i>
          <p class="text-sm text-gray-500">
            No hay información adicional disponible sobre este evento
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
export class EventAboutComponent {
    readonly description = input<string>('');
    readonly artists = input<Artist[]>([]);

    getInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
}