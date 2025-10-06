import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { EventService } from '../../services/event.service';
import { Event } from '../../../../core/models';
import { EventDetailTemplateComponent, EventDetailData } from '../../../../shared/components/template/event-detail-template/event-detail-template.component';
import { MOCK_EVENTS } from '../../mock-data/events-mock-data';

@Component({
    selector: 'app-event-detail',
    standalone: true,
    imports: [CommonModule, ToastModule, EventDetailTemplateComponent],
    providers: [MessageService],
    template: `
    <event-detail-template
      [eventData]="eventData()"
      [loading]="loading()"
      (buyTicketsClicked)="onBuyTickets()"
      (shareEventClicked)="onShareEvent()"
      (saveEventClicked)="onSaveEvent()"
      (followOrganizerClicked)="onFollowOrganizer()"
      (unfollowOrganizerClicked)="onUnfollowOrganizer()"
      (contactOrganizerClicked)="onContactOrganizer()"
      (reportEventClicked)="onReportEvent()"
      (tagClicked)="onTagClick($event)"
      (relatedEventClicked)="onRelatedEventClick($event)" />
    <p-toast />
  `,
})
export class EventDetailPage implements OnInit {
    private readonly eventService = inject(EventService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly messageService = inject(MessageService);

    // Signals
    readonly loading = signal<boolean>(false);
    readonly eventData = signal<EventDetailData | null>(null);
    readonly error = signal<string | null>(null);

    // State
    private isFollowingOrganizer = false;
    private savedEvents = new Set<number>();

    ngOnInit(): void {
        this.loadEvent();
    }

    private loadEvent(): void {
        const eventId = this.route.snapshot.paramMap.get('id');

        if (!eventId) {
            this.error.set('ID de evento no válido');
            this.router.navigate(['/events']);
            return;
        }

        this.loading.set(true);
        this.error.set(null);

        // Use mock data for now
        const mockEvent = MOCK_EVENTS.find(event => event.id === +eventId);

        if (mockEvent) {
            console.log('Using mock event:', mockEvent);
            this.prepareEventData(mockEvent);
        } else {
            this.error.set('Evento no encontrado');
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo encontrar el evento solicitado'
            });
        }

        this.loading.set(false);
    }

    private prepareEventData(event: Event): void {
        const relatedEvents = this.getMockRelatedEvents();
        console.log('Related events generated:', relatedEvents);
        console.log('Related events count:', relatedEvents.length);

        const eventDetailData: EventDetailData = {
            event: event as any,
            relatedEvents: relatedEvents,
            organizerStats: this.getOrganizerStats(event),
            policies: this.getEventPolicies(event),
            eventStats: this.getEventStats(event)
        };

        console.log('Event detail data prepared:', eventDetailData);
        console.log('Related events in eventDetailData:', eventDetailData.relatedEvents);
        console.log('Event in eventDetailData:', eventDetailData.event);

        this.eventData.set(eventDetailData);
        console.log('eventData signal set to:', this.eventData());
    }

    private getEventStartDate(event: Event): Date {
        if (event.eventDates && event.eventDates.length > 0) {
            const dates = event.eventDates.map(eventDate => new Date(eventDate.date));
            return new Date(Math.min(...dates.map(date => date.getTime())));
        }
        return new Date();
    }

    private getEventEndDate(event: Event): Date {
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
        return 'No especificada';
    }

    private getEventSpeakers(event: Event): any[] {
        if (event.eventDates && event.eventDates.length > 0) {
            return event.eventDates.flatMap(eventDate => eventDate.speakers);
        }
        return [];
    }

    private getMockRelatedEvents(): Event[] {
        // Mock related events - in real app, this would come from API
        return [
            {
                id: 2,
                name: 'Conferencia de Desarrollo Web',
                description: 'Aprende las últimas tecnologías web, frameworks modernos y mejores prácticas de desarrollo.',
                maxParticipants: 200,
                currentParticipants: 150,
                isActive: true,
                eventTypeId: 1,
                eventType: 'Conferencia',
                address: {
                    id: 2,
                    street: 'Av. Tecnológica 456',
                    city: 'Santo Domingo',
                    state: 'Distrito Nacional',
                    country: 'República Dominicana',
                    zipCode: '10102',
                    latitude: 18.4861,
                    longitude: -69.9312
                },
                images: [
                    {
                        id: 11,
                        url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
                        description: 'Conferencia de desarrollo web',
                        isPrimary: true
                    }
                ],
                eventDates: [
                    {
                        id: 1,
                        date: '2024-04-15',
                        talks: [],
                        speakers: [],
                        schedules: [],
                        modalities: [],
                        locations: []
                    }
                ],
                participants: []
            },
            {
                id: 3,
                name: 'Workshop de React Avanzado',
                description: 'Domina React con hooks, context, y patrones avanzados de desarrollo.',
                maxParticipants: 50,
                currentParticipants: 23,
                isActive: true,
                eventTypeId: 2,
                eventType: 'Workshop',
                address: {
                    id: 3,
                    street: 'Virtual',
                    city: 'Online',
                    state: 'Online',
                    country: 'Online'
                },
                images: [
                    {
                        id: 12,
                        url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
                        description: 'Workshop de React',
                        isPrimary: true
                    }
                ],
                eventDates: [
                    {
                        id: 2,
                        date: '2024-04-20',
                        talks: [],
                        speakers: [],
                        schedules: [],
                        modalities: [],
                        locations: []
                    }
                ],
                participants: []
            }
        ];
    }

    private getOrganizerStats(event: Event): Array<{ label: string; value: string; icon?: string }> {
        return [
            {
                label: 'Eventos organizados',
                value: '15',
                icon: 'pi pi-calendar'
            },
            {
                label: 'Participantes totales',
                value: '2,847',
                icon: 'pi pi-users'
            },
            {
                label: 'Calificación promedio',
                value: '4.8/5',
                icon: 'pi pi-star'
            }
        ];
    }

    private getEventPolicies(event: Event): Array<{ title: string; description: string; chipText?: string }> {
        return [
            {
                title: 'Política de Cancelación',
                description: 'Puedes cancelar tu participación hasta 24 horas antes del evento y recibirás un reembolso completo.',
                chipText: '24h'
            },
            {
                title: 'Política de Reembolso',
                description: 'Reembolsos completos disponibles hasta 48 horas después de la compra.',
                chipText: '48h'
            },
            {
                title: 'Código de Conducta',
                description: 'Todos los participantes deben seguir nuestro código de conducta para crear un ambiente respetuoso.',
                chipText: 'Requerido'
            }
        ];
    }

    private getEventStats(event: Event): Array<{ label: string; value: string; icon?: string }> {
        return [
            {
                label: 'Duración',
                value: this.calculateEventDuration(event),
                icon: 'pi pi-clock'
            },
            {
                label: 'Participantes',
                value: `${event.currentParticipants || 0}/${event.maxParticipants || 0}`,
                icon: 'pi pi-users'
            },
            {
                label: 'Tipo de evento',
                value: event.eventType || 'No especificado',
                icon: 'pi pi-tag'
            },
            {
                label: 'Modalidad',
                value: this.getEventModality(event),
                icon: 'pi pi-desktop'
            }
        ];
    }

    private calculateEventDuration(event: Event): string {
        const start = this.getEventStartDate(event);
        const end = this.getEventEndDate(event);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

        if (diffHours < 24) {
            return `${diffHours} horas`;
        } else {
            const days = Math.floor(diffHours / 24);
            const remainingHours = diffHours % 24;
            return `${days} días${remainingHours > 0 ? ` y ${remainingHours} horas` : ''}`;
        }
    }

    // Event handlers
    onBuyTickets(): void {
        const event = this.eventData()?.event;
        if (event) {
            this.messageService.add({
                severity: 'info',
                summary: 'Comprar Entradas',
                detail: `Redirigiendo a la compra de entradas para: ${event.name}`
            });

            // In a real app, this would redirect to a ticket purchase page
            console.log('Redirecting to ticket purchase for event:', event.id);
        }
    }

    onShareEvent(): void {
        const event = this.eventData()?.event;
        if (event && navigator.share) {
            navigator.share({
                title: event.name,
                text: event.description || '',
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Compartir',
                    detail: 'Enlace copiado al portapapeles'
                });
            }).catch(() => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo copiar el enlace'
                });
            });
        }
    }

    onSaveEvent(): void {
        const event = this.eventData()?.event;
        if (event) {
            if (this.savedEvents.has(event.id)) {
                this.savedEvents.delete(event.id);
                this.messageService.add({
                    severity: 'info',
                    summary: 'Evento',
                    detail: 'Evento removido de tus guardados'
                });
            } else {
                this.savedEvents.add(event.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Evento',
                    detail: 'Evento guardado exitosamente'
                });
            }
        }
    }

    onFollowOrganizer(): void {
        this.isFollowingOrganizer = true;
        this.messageService.add({
            severity: 'success',
            summary: 'Seguir',
            detail: 'Ahora sigues a este organizador'
        });
    }

    onUnfollowOrganizer(): void {
        this.isFollowingOrganizer = false;
        this.messageService.add({
            severity: 'info',
            summary: 'Dejar de Seguir',
            detail: 'Ya no sigues a este organizador'
        });
    }

    onContactOrganizer(): void {
        const event = this.eventData()?.event;
        if (!event) {
            this.messageService.add({
                severity: 'info',
                summary: 'Contactar',
                detail: 'Información de contacto no disponible'
            });
            return;
        }

        const speakers = this.getEventSpeakers(event);
        if (speakers && speakers.length > 0 && speakers[0].email) {
            window.open(`mailto:${speakers[0].email}`, '_blank');
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Contactar',
                detail: 'Información de contacto no disponible'
            });
        }
    }

    onReportEvent(): void {
        this.messageService.add({
            severity: 'info',
            summary: 'Reportar Evento',
            detail: 'Gracias por reportar. Revisaremos este evento.'
        });

        // In a real app, this would open a report form or send a report
        console.log('Reporting event:', this.eventData()?.event?.id);
    }

    onTagClick(tag: string): void {
        this.messageService.add({
            severity: 'info',
            summary: 'Filtrar por Etiqueta',
            detail: `Buscando eventos con etiqueta: ${tag}`
        });

        // In a real app, this would navigate to a filtered events list
        this.router.navigate(['/events'], { queryParams: { tag } });
    }

    onRelatedEventClick(event: Event): void {
        this.router.navigate(['/events', event.id]);
    }
}
