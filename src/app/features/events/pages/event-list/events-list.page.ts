import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../../../core/models';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventListTemplate } from "../../components/templates/event-list-template/event-list-template";
import { MOCK_EVENTS } from "../../mock-data/events-mock-data";
import { MOCK_SLIDESHOW_IMAGES } from "../../mock-data/events-mock-data";
import { MOCK_TABS } from "../../mock-data/events-mock-data";
import { ImgProps, Tab } from "../../../../core/models/core.models";


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
    <app-event-list-template 
      [events]="events()" 
      [slideshowImages]="slideshowImages()" 
      [tabs]="tabs()" 
      [loading]="loading()"
      [activeTab]="activeTab()"
      (tabChanged)="onTabChanged($event)" />
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
  readonly activeTab = signal<string>('all');

  // Mock data signals
  readonly slideshowImages = signal<ImgProps[]>(MOCK_SLIDESHOW_IMAGES);
  readonly tabs = signal<Tab[]>(MOCK_TABS);


  readonly emptyMessage = computed(() => {
    const err = this.error();
    if (err) {
      return `Error loading events: ${err}`;
    }
    return 'No events found. Create your first event!';
  });

  constructor() {
    this.loadEvents();
    this.events.set(MOCK_EVENTS);
  }

  private loadEvents(): void {
    this.loading.set(true);
    this.error.set(null);

    this.eventService.getAll().subscribe({
      next: (response) => {
        if (response.data && Array.isArray(response.data)) {
          const eventsWithLocation = response.data.map((event: Event) => ({
            ...event,
            location: this.getEventLocation(event),
            startDate: this.getEventStartDate(event),
            endDate: this.getEventEndDate(event),
            eventType: event.eventType || '-',
            modality: this.getEventModality(event),
            speakers: this.getEventSpeakers(event),
            talks: this.getEventTalks(event)
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
    if (event.address) {
      const address = event.address;
      return (
        `${address.city || ''}, ${address.country || ''}`.replace(
          /^,\s*|,\s*$/g,
          ''
        ) || 'No location'
      );
    }
    return 'No location';
  }

  private getEventStartDate(event: Event): Date | string {
    if (event.eventDates && event.eventDates.length > 0) {
      const dates = event.eventDates.map(eventDate => new Date(eventDate.date));
      return new Date(Math.min(...dates.map(date => date.getTime())));
    }
    return new Date();
  }

  private getEventEndDate(event: Event): Date | string {
    if (event.eventDates && event.eventDates.length > 0) {
      const dates = event.eventDates.map(eventDate => new Date(eventDate.date));
      return new Date(Math.max(...dates.map(date => date.getTime())));
    }
    return new Date();
  }

  private getEventModality(event: Event): string {
    if (event.eventDates && event.eventDates.length > 0) {
      const modalities = event.eventDates.flatMap(eventDate => eventDate.modalities);
      const hasOnline = modalities.some(mod => mod.isOnline);
      const hasInPerson = modalities.some(mod => mod.isInPerson);

      if (hasOnline && hasInPerson) {
        return 'Híbrido';
      } else if (hasOnline) {
        return 'Online';
      } else if (hasInPerson) {
        return 'Presencial';
      }
    }
    return '-';
  }

  private getEventSpeakers(event: Event): any[] {
    if (event.eventDates && event.eventDates.length > 0) {
      return event.eventDates.flatMap(eventDate => eventDate.speakers);
    }
    return [];
  }

  private getEventTalks(event: Event): any[] {
    if (event.eventDates && event.eventDates.length > 0) {
      return event.eventDates.flatMap(eventDate => eventDate.talks);
    }
    return [];
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

  onTabChanged(tabId: string): void {
    this.activeTab.set(tabId);
  }


}