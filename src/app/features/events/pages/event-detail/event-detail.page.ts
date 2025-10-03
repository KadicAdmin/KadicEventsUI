import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { EventService } from '../../services/event.service';
import { Event } from '../../../../core/models';
import { EventDetailTemplateComponent, EventDetailData } from '../../../../shared/components/template/event-detail-template/event-detail-template.component';

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

        this.eventService.getById(+eventId).subscribe({
            next: (response) => {
                if (response) {
                    this.prepareEventData(response);
                } else {
                    this.error.set('Evento no encontrado');
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo encontrar el evento solicitado'
                    });
                }
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Error loading event:', error);
                this.error.set('Error al cargar el evento');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cargar la información del evento'
                });
                this.loading.set(false);
            }
        });
    }

  private prepareEventData(event: Event): void {
    const relatedEvents = this.getMockRelatedEvents();
    console.log('Related events generated:', relatedEvents);
    console.log('Related events count:', relatedEvents.length);
    
    const eventDetailData: EventDetailData = {
      event: {
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      },
      relatedEvents: relatedEvents,
      organizerStats: this.getOrganizerStats(event),
      policies: this.getEventPolicies(event),
      eventStats: this.getEventStats(event)
    };

    console.log('Event detail data prepared:', eventDetailData);
    console.log('Related events in eventDetailData:', eventDetailData.relatedEvents);
    
    this.eventData.set(eventDetailData);
  }

    private getMockRelatedEvents(): Event[] {
        // Mock related events - in real app, this would come from API
        return [
            {
                id: 2,
                name: 'Conferencia de Desarrollo Web',
                description: 'Aprende las últimas tecnologías web, frameworks modernos y mejores prácticas de desarrollo.',
                startDate: new Date('2024-04-15T09:00:00.000Z'),
                endDate: new Date('2024-04-15T17:00:00.000Z'),
                addresses: [
                    {
                        id: 2,
                        street: 'Av. Tecnológica 456',
                        city: 'Santo Domingo',
                        state: 'Distrito Nacional',
                        country: 'República Dominicana',
                        zipCode: '10102',
                        latitude: 18.4861,
                        longitude: -69.9312
                    }
                ],
                maxParticipants: 100,
                currentParticipants: 45,
                isActive: true,
                images: [
                    {
                        id: 11,
                        url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
                        description: 'Conferencia de desarrollo web',
                        isPrimary: true
                    }
                ],
                eventTypeId: 1,
                modalityId: 1,
                eventType: 'Conference',
                modality: 'Online',
                virtualPlatformLink: 'https://teams.microsoft.com/l/meetup-join/123456789',
                location: 'Santo Domingo, República Dominicana',
                speakers: [],
                participants: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                name: 'Workshop de React Avanzado',
                description: 'Domina React con hooks, context, y patrones avanzados de desarrollo.',
                startDate: new Date('2024-04-20T10:00:00.000Z'),
                endDate: new Date('2024-04-20T16:00:00.000Z'),
                addresses: [],
                maxParticipants: 50,
                currentParticipants: 23,
                isActive: true,
                images: [
                    {
                        id: 12,
                        url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
                        description: 'Workshop de React',
                        isPrimary: true
                    }
                ],
                eventTypeId: 2,
                modalityId: 1,
                eventType: 'Workshop',
                modality: 'Online',
                virtualPlatformLink: 'https://zoom.us/j/123456789',
                location: 'Evento Virtual',
                speakers: [],
                participants: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                name: 'Seminario de Angular 20',
                description: 'Descubre las nuevas características de Angular 20 y mejores prácticas.',
                startDate: new Date('2024-05-10T14:00:00.000Z'),
                endDate: new Date('2024-05-10T18:00:00.000Z'),
                addresses: [
                    {
                        id: 3,
                        street: 'Calle Principal 789',
                        city: 'Santiago',
                        state: 'Santiago',
                        country: 'República Dominicana',
                        zipCode: '51000',
                        latitude: 19.4517,
                        longitude: -70.6970
                    }
                ],
                maxParticipants: 80,
                currentParticipants: 67,
                isActive: true,
                images: [
                    {
                        id: 13,
                        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
                        description: 'Seminario de Angular',
                        isPrimary: true
                    }
                ],
                eventTypeId: 1,
                modalityId: 5,
                eventType: 'Seminar',
                modality: 'Offline',
                virtualPlatformLink: undefined,
                location: 'Santiago, República Dominicana',
                speakers: [],
                participants: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                name: 'Hackathon de Innovación',
                description: 'Competencia de programación para crear soluciones innovadoras.',
                startDate: new Date('2024-05-25T08:00:00.000Z'),
                endDate: new Date('2024-05-26T20:00:00.000Z'),
                addresses: [
                    {
                        id: 4,
                        street: 'Av. Innovación 321',
                        city: 'Santo Domingo',
                        state: 'Distrito Nacional',
                        country: 'República Dominicana',
                        zipCode: '10103',
                        latitude: 18.4861,
                        longitude: -69.9312
                    }
                ],
                maxParticipants: 200,
                currentParticipants: 156,
                isActive: true,
                images: [
                    {
                        id: 14,
                        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
                        description: 'Hackathon de innovación',
                        isPrimary: true
                    }
                ],
                eventTypeId: 3,
                modalityId: 5,
                eventType: 'Hackathon',
                modality: 'Offline',
                virtualPlatformLink: undefined,
                location: 'Santo Domingo, República Dominicana',
                speakers: [],
                participants: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6,
                name: 'Meetup de JavaScript',
                description: 'Encuentro mensual de desarrolladores JavaScript para networking y aprendizaje.',
                startDate: new Date('2024-06-05T19:00:00.000Z'),
                endDate: new Date('2024-06-05T21:00:00.000Z'),
                addresses: [],
                maxParticipants: 60,
                currentParticipants: 42,
                isActive: true,
                images: [
                    {
                        id: 15,
                        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
                        description: 'Meetup de JavaScript',
                        isPrimary: true
                    }
                ],
                eventTypeId: 4,
                modalityId: 2,
                eventType: 'Meetup',
                modality: 'Hybrid',
                virtualPlatformLink: 'https://meet.google.com/abc-defg-hij',
                location: 'Evento Híbrido',
                speakers: [],
                participants: [],
                createdAt: new Date(),
                updatedAt: new Date()
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
                value: event.modality || 'No especificada',
                icon: 'pi pi-desktop'
            }
        ];
    }

    private calculateEventDuration(event: Event): string {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
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
        if (event?.speakers?.[0]?.email) {
            window.open(`mailto:${event.speakers[0].email}`, '_blank');
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
