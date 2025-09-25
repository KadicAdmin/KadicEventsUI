import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../../../core/models';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventListTemplate } from "../../components/templates/event-list-template/event-list-template";


@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    EventListTemplate
  ],
  providers: [MessageService],
  template: `
    <app-event-list-template />
    <p-toast />
  `,
})
export class EventsListPage {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  // Signals
  readonly events = signal<Event[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);


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
          const eventsWithLocation = response.data.map((event: Event) => ({
            ...event,
            location: this.getEventLocation(event),
            startDate: new Date(event.startDate), // Mantener como Date object
            endDate: new Date(event.endDate), // Mantener como Date object
            eventType: event.eventType || '-', // Mostrar "-" si está vacío
            modality: event.modality || '-', // Mostrar "-" si está vacío
          }));

          this.events.set(eventsWithLocation);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Loaded ${response.data.length} events successfully`,
          });
        } else {
          this.error.set('Invalid response format');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid response format from server',
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
          detail:
            'Failed to connect to the server. Please check your connection and try again.',
        });
      },
    });
  }

  private getEventLocation(event: Event): string {
    if (event.addresses && event.addresses.length > 0) {
      const address = event.addresses[0];
      return (
        `${address.city || ''}, ${address.country || ''}`.replace(
          /^,\s*|,\s*$/g,
          ''
        ) || 'No location'
      );
    }
    return event.virtualPlatformLink ? 'Virtual Event' : 'No location';
  }
  createEvent(): void {
    this.router.navigate(['/events/create']);
  }

  viewEvent(id: number): void {
    this.router.navigate(['/events', id]);
  }

  editEvent(id: number): void {
    this.router.navigate(['/events/edit', id]);
  }

  deleteEvent(id: number): void {
    if (
      confirm(
        'Are you sure you want to delete this event? This action cannot be undone.'
      )
    ) {
      this.loading.set(true);

      this.eventService.delete(id).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Event deleted successfully',
          });
          this.loadEvents(); // Recargar la lista
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error deleting event:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete event. Please try again.',
          });
          this.loading.set(false);
        },
      });
    }
  }
  refreshEvents(): void {
    this.loadEvents();
  }

}