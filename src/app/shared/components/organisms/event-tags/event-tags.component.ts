import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from '../../molecules/tag-list/tag-list.component';

@Component({
    selector: 'event-tags',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <i class="pi pi-tags text-2xl text-blue-600"></i>
        <h3 class="text-2xl font-bold text-gray-900">Categorías y Etiquetas</h3>
      </div>
      
      @if (tags().length > 0) {
        <div class="space-y-6">
          <!-- Main Tags -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i class="pi pi-bookmark text-blue-600"></i>
              Categorías Principales
            </h4>
            <div class="flex flex-wrap gap-2">
              @for (tag of getMainTags(); track tag) {
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer" (click)="onTagClick(tag)">
                  <i class="pi pi-tag mr-1"></i>
                  {{ tag }}
                </span>
              }
            </div>
          </div>
          
          <!-- Technology Tags -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i class="pi pi-cog text-green-600"></i>
              Tecnologías
            </h4>
            <div class="flex flex-wrap gap-2">
              @for (tag of getTechTags(); track tag) {
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors cursor-pointer" (click)="onTagClick(tag)">
                  <i class="pi pi-code mr-1"></i>
                  {{ tag }}
                </span>
              }
            </div>
          </div>
          
          <!-- Skill Level Tags -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i class="pi pi-star text-orange-600"></i>
              Nivel de Experiencia
            </h4>
            <div class="flex flex-wrap gap-2">
              @for (tag of getSkillTags(); track tag) {
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors cursor-pointer" (click)="onTagClick(tag)">
                  <i class="pi pi-star mr-1"></i>
                  {{ tag }}
                </span>
              }
            </div>
          </div>
          
          <!-- Additional Tags -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i class="pi pi-plus text-purple-600"></i>
              Etiquetas Adicionales
            </h4>
            <div class="flex flex-wrap gap-2">
              @for (tag of getAdditionalTags(); track tag) {
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer" (click)="onTagClick(tag)">
                  {{ tag }}
                </span>
              }
            </div>
          </div>
          
          <!-- Filter Actions -->
          <div class="flex gap-2 pt-4 border-t border-gray-200">
            <button class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors" (click)="onFilterByTech()">
              <i class="pi pi-filter mr-1"></i>
              Filtrar por Tecnología
            </button>
            <button class="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition-colors" (click)="onFindSimilar()">
              <i class="pi pi-search mr-1"></i>
              Ver Eventos Similares
            </button>
          </div>
        </div>
      } @else {
        <div class="text-center py-8">
          <i class="pi pi-tags text-3xl text-gray-400 mb-3"></i>
          <p class="text-sm text-gray-500 mb-4">
            No hay etiquetas disponibles para este evento
          </p>
          <button class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors">
            <i class="pi pi-plus mr-1"></i>
            Agregar Etiquetas
          </button>
        </div>
      }
    </div>
  `
})
export class EventTagsComponent {
    readonly tags = input<string[]>([]);
    readonly clickable = input<boolean>(false);

    readonly tagClicked = output<string>();
    readonly filterByTechClicked = output<void>();
    readonly findSimilarClicked = output<void>();

    onTagClick(tag: string): void {
        this.tagClicked.emit(tag);
    }

    onFilterByTech(): void {
        this.filterByTechClicked.emit();
    }

    onFindSimilar(): void {
        this.findSimilarClicked.emit();
    }

    getMainTags(): string[] {
        return ['Tecnología', 'Desarrollo', 'Conferencia', 'Networking'];
    }

    getTechTags(): string[] {
        return ['Angular', 'TypeScript', 'Web Development', 'Frontend', 'JavaScript'];
    }

    getSkillTags(): string[] {
        return ['Intermedio', 'Avanzado', 'Profesional'];
    }

    getAdditionalTags(): string[] {
        return ['Presencial', 'Certificación', 'Workshop', 'Hands-on'];
    }
}