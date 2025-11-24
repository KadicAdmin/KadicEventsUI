import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export interface DataViewAction {
    icon: string;
    label: string;
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger';
    action: (item: any) => void;
    visible?: (item: any) => boolean;
}

export interface DataViewConfig {
    layout?: 'list' | 'grid';
    paginator?: boolean;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    showLayoutOptions?: boolean;
}

@Component({
    selector: 'app-data-view',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule
    ],
    template: `
    <div class="data-view-container">
      <!-- Header with title and layout options -->
      @if (config().showLayoutOptions) {
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold">{{ title() }}</h3>
          <div class="flex gap-2">
            <p-button
              icon="pi pi-list"
              [severity]="currentLayout() === 'list' ? 'primary' : 'secondary'"
              [outlined]="currentLayout() !== 'list'"
              (onClick)="onLayoutChange('list')"
              pTooltip="List View"
              size="small"
            />
            <p-button
              icon="pi pi-th-large"
              [severity]="currentLayout() === 'grid' ? 'primary' : 'secondary'"
              [outlined]="currentLayout() !== 'grid'"
              (onClick)="onLayoutChange('grid')"
              pTooltip="Grid View"
              size="small"
            />
          </div>
        </div>
      }

      <!-- Loading state -->
      @if (loading()) {
        <div class="flex justify-center items-center p-8">
          <i class="pi pi-spin pi-spinner text-3xl text-gray-400"></i>
          <span class="ml-2 text-gray-600">Loading...</span>
        </div>
      } @else if (data().length > 0) {
        <!-- List Layout -->
        @if (currentLayout() === 'list') {
          <div class="space-y-4">
            @for (item of data(); track item.id) {
              <div class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-grow">
                    <h4 class="text-xl font-semibold text-gray-900 mb-3">{{ item.name }}</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                      <div class="flex items-center">
                        <i class="pi pi-calendar mr-2 text-blue-500"></i>
                        <span><strong>Start:</strong> {{ item.startDate | date:'short' }}</span>
                      </div>
                      <div class="flex items-center">
                        <i class="pi pi-calendar mr-2 text-blue-500"></i>
                        <span><strong>End:</strong> {{ item.endDate | date:'short' }}</span>
                      </div>
                      <div class="flex items-center">
                        <i class="pi pi-map-marker mr-2 text-green-500"></i>
                        <span><strong>Location:</strong> {{ item.location || 'No location' }}</span>
                      </div>
                      @if (item.virtualPlatformLink) {
                        <div class="flex items-center">
                          <i class="pi pi-link mr-2 text-purple-500"></i>
                          <span><strong>Virtual Link</strong></span>
                        </div>
                      }
                    </div>
                    <div class="flex flex-wrap gap-2">
                      @if (item.eventType && item.eventType !== '-') {
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{{ item.eventType }}</span>
                      }
                      @if (item.modality && item.modality !== '-') {
                        <span class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">{{ item.modality }}</span>
                      }
                      @if (item.maxParticipants) {
                        <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Max: {{ item.maxParticipants }}</span>
                      }
                    </div>
                  </div>
                  <div class="flex gap-2 ml-6">
                    @for (action of actions(); track action.label) {
                      <p-button
                        [icon]="action.icon"
                        [severity]="action.severity || 'secondary'"
                        size="small"
                        [outlined]="true"
                        [pTooltip]="action.label"
                        (onClick)="action.action(item)"
                      />
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <!-- Grid Layout -->
        @if (currentLayout() === 'grid') {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of data(); track item.id) {
              <div class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow h-full">
                <div class="flex flex-col h-full">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">{{ item.name }}</h4>
                  <div class="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
                    <div class="flex items-center">
                      <i class="pi pi-calendar mr-2 text-blue-500"></i>
                      <span>{{ item.startDate | date:'short' }}</span>
                    </div>
                    <div class="flex items-center">
                      <i class="pi pi-map-marker mr-2 text-green-500"></i>
                      <span>{{ item.location || 'No location' }}</span>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-1 mb-4">
                    @if (item.eventType && item.eventType !== '-') {
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{{ item.eventType }}</span>
                    }
                    @if (item.modality && item.modality !== '-') {
                      <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">{{ item.modality }}</span>
                    }
                  </div>
                  <div class="flex gap-2 mt-auto">
                    @for (action of actions(); track action.label) {
                      <p-button
                        [icon]="action.icon"
                        [severity]="action.severity || 'secondary'"
                        size="small"
                        [outlined]="true"
                        [pTooltip]="action.label"
                        (onClick)="action.action(item)"
                      />
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }
      } @else {
        <!-- Empty state -->
        <div class="text-center p-12">
          <i class="pi pi-inbox text-6xl text-gray-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">{{ emptyMessage() }}</h3>
          <p class="text-gray-500">No data available to display</p>
        </div>
      }
    </div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class DataViewComponent {
    // Inputs
    readonly data = input<any[]>([]);
    readonly actions = input<DataViewAction[]>([]);
    readonly loading = input<boolean>(false);
    readonly emptyMessage = input<string>('No data found');
    readonly title = input<string>('');
    readonly config = input<DataViewConfig>({
        layout: 'list',
        paginator: true,
        rows: 6,
        showLayoutOptions: true
    });

    // Outputs
    readonly layoutChange = output<'list' | 'grid'>();

    // Computed
    readonly currentLayout = computed(() => this.config().layout || 'list');

    constructor() {
        // Component is ready to use
    }

    onLayoutChange(layout: 'list' | 'grid'): void {
        this.layoutChange.emit(layout);
    }

    onImageError(event: any): void {
        // Set a default image or hide the image element
        event.target.style.display = 'none';
    }
}
