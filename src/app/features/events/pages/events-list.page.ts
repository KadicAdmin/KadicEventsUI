import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { DataViewComponent, DataViewAction, DataViewConfig } from '../../../shared/components/organisms/data-view/data-view.component';
import { CardComponent } from '../../../shared/components/molecules/card/card.component';
import { ButtonComponent } from '../../../shared/components/atoms/button/button.component';
import { EventService } from '../services/event.service';
import { Event } from '../../../core/models';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    CommonModule,
    DataViewComponent,
    CardComponent,
    ButtonComponent,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="p-6">
      <app-card>
        <div slot="header" class="flex justify-between items-center p-4">
          <div>
            <h1 class="text-2xl font-bold">Events Management</h1>
            <p class="text-gray-600 mt-1">Manage all your events from here</p>
          </div>
          <div class="flex gap-2">
            <app-button
              label="Refresh"
              icon="pi pi-refresh"
              variant="secondary"
              [outlined]="true"
              (clicked)="refreshEvents()"
              [loading]="loading()"
            />
            <app-button
              label="New Event"
              icon="pi pi-plus"
              (clicked)="createEvent()"
            />
          </div>
        </div>

        <app-data-view
          [data]="events()"
          [actions]="actions()"
          [loading]="loading()"
          [emptyMessage]="emptyMessage()"
          [title]="'Events'"
          [config]="dataViewConfig()"
          (layoutChange)="onLayoutChange($event)"
        />
      </app-card>
    </div>
    
    <p-toast />
  `
})
export class EventsListPage {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  // Signals
  readonly events = signal<Event[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly dataViewConfig = signal<DataViewConfig>({
    layout: 'list',
    paginator: true,
    rows: 6,
    showLayoutOptions: true,
    sortField: 'name',
    sortOrder: 1
  });

  readonly actions = signal<DataViewAction[]>([
    {
      icon: 'pi pi-eye',
      label: 'View',
      severity: 'info',
      action: (event: Event) => this.viewEvent(event.id)
    },
    {
      icon: 'pi pi-pencil',
      label: 'Edit',
      severity: 'secondary',
      action: (event: Event) => this.editEvent(event.id)
    },
    {
      icon: 'pi pi-trash',
      label: 'Delete',
      severity: 'danger',
      action: (event: Event) => this.deleteEvent(event.id)
    }
  ]);

  readonly emptyMessage = computed(() => {
    const err = this.error();
    if (err) {
      return `Error loading events: ${err}`;
    }
    return 'No events found. Create your first event!';
  });

  constructor() {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.loading.set(true);
    this.error.set(null);

    this.eventService.getAll().subscribe({
      next: (response) => {
        if (response.data && Array.isArray(response.data)) {
          // Transformar los datos para que coincidan con la tabla
          const eventsWithLocation = response.data.map(event => ({
            ...event,
            location: this.getEventLocation(event),
            startDate: new Date(event.startDate), // Mantener como Date object
            endDate: new Date(event.endDate),     // Mantener como Date object
            eventType: event.eventType || '-',    // Mostrar "-" si está vacío
            modality: event.modality || '-'       // Mostrar "-" si está vacío
          }));

          this.events.set(eventsWithLocation);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Loaded ${response.data.length} events successfully`
          });
        } else {
          this.error.set('Invalid response format');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid response format from server'
          });
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.error.set('Failed to connect to the server. Please try again.');
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Connection Error',
          detail: 'Failed to connect to the server. Please check your connection and try again.'
        });
      }
    });
  }

  private getEventLocation(event: Event): string {
    if (event.addresses && event.addresses.length > 0) {
      const address = event.addresses[0];
      return `${address.city || ''}, ${address.country || ''}`.replace(/^,\s*|,\s*$/g, '') || 'No location';
    }
    return event.virtualPlatformLink ? 'Virtual Event' : 'No location';
  } createEvent(): void {
    this.router.navigate(['/events/create']);
  }

  viewEvent(id: number): void {
    this.router.navigate(['/events', id]);
  }

  editEvent(id: number): void {
    this.router.navigate(['/events/edit', id]);
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      this.loading.set(true);

      this.eventService.delete(id).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Event deleted successfully'
          });
          this.loadEvents(); // Recargar la lista
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error deleting event:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete event. Please try again.'
          });
          this.loading.set(false);
        }
      });
    }
  } refreshEvents(): void {
    this.loadEvents();
  }

  onLayoutChange(layout: 'list' | 'grid'): void {
    this.dataViewConfig.update(config => ({
      ...config,
      layout: layout
    }));
  }
}
