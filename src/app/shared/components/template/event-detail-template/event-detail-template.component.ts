import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../core/models';

// Import organisms
import { EventHeroComponent } from '../../organisms/event-hero/event-hero.component';
import { EventDatetimeComponent } from '../../organisms/event-datetime/event-datetime.component';
import { EventLocationComponent } from '../../organisms/event-location/event-location.component';
import { EventGoodToKnowComponent } from '../../organisms/event-good-to-know/event-good-to-know.component';
import { EventAboutComponent } from '../../organisms/event-about/event-about.component';
import { EventTagsComponent } from '../../organisms/event-tags/event-tags.component';
import { OrganizerCardComponent } from '../../organisms/organizer-card/organizer-card.component';
import { ReportEventComponent } from '../../organisms/report-event/report-event.component';
import { ImgProps } from '@core/models/core.models';
import { UiSkeletonComponent } from '../../atoms/ui-skeleton/ui-skeleton.component';
import { CarouselModule } from 'primeng/carousel';
import { EventCarouselComponent } from '../../organisms/event-carousel/event-carousel.component';

// Import molecules
import { StatListComponent, StatItem } from '../../molecules/stat-list/stat-list.component';
import { PolicyItemComponent } from '../../molecules/policy-item/policy-item.component';

// Import existing components
import { FooterComponent } from '../../organisms/footer/footer.component';

export interface EventDetailData {
    event: Event;
    relatedEvents: Event[];
    organizerStats: StatItem[];
    policies: Array<{
        title: string;
        description: string;
        chipText?: string;
    }>;
    eventStats: StatItem[];
}

@Component({
    selector: 'event-detail-template',
    standalone: true,
    imports: [
        CommonModule,
        EventHeroComponent,
        EventDatetimeComponent,
        EventLocationComponent,
        EventGoodToKnowComponent,
        EventAboutComponent,
        EventTagsComponent,
        OrganizerCardComponent,
        ReportEventComponent,
        UiSkeletonComponent,
        CarouselModule,
        EventCarouselComponent,
    ],
    templateUrl: './event-detail-template.component.html'
})
export class EventDetailTemplateComponent {
    readonly eventData = input<EventDetailData | null>(null);
    readonly loading = input<boolean>(false);

    constructor() {
        // Debug logs
        console.log('EventDetailTemplateComponent initialized');
    }


    // Outputs
    readonly buyTicketsClicked = output<void>();
    readonly shareEventClicked = output<void>();
    readonly saveEventClicked = output<void>();
    readonly followOrganizerClicked = output<void>();
    readonly unfollowOrganizerClicked = output<void>();
    readonly contactOrganizerClicked = output<void>();
    readonly reportEventClicked = output<void>();
    readonly tagClicked = output<string>();
    readonly relatedEventClicked = output<Event>();

    // Event actions
    onBuyTickets(): void {
        this.buyTicketsClicked.emit();
    }

    onShareEvent(): void {
        this.shareEventClicked.emit();
    }

    onSaveEvent(): void {
        this.saveEventClicked.emit();
    }

    onFollowOrganizer(): void {
        this.followOrganizerClicked.emit();
    }

    onUnfollowOrganizer(): void {
        this.unfollowOrganizerClicked.emit();
    }

    onContactOrganizer(): void {
        this.contactOrganizerClicked.emit();
    }

    onReportEvent(): void {
        this.reportEventClicked.emit();
    }

    onTagClick(tag: string): void {
        this.tagClicked.emit(tag);
    }

    transformRelatedEvents(): any[] {
        const events = this.eventData()?.relatedEvents || [];
        console.log('Related events in template:', events);
        console.log('Event data:', this.eventData());
        return events.map(event => ({
            id: event.id,
            title: event.name,
            imageUrl: event.images?.[0]?.url,
            date: event.startDate,
            location: this.getEventLocationFromEvent(event),
            price: Math.floor(Math.random() * 100) + 20,
            currency: '$'
        }));
    }

    onRelatedEventClick(event: any): void {
        // Transform back to Event type for the output
        const originalEvent = this.eventData()?.relatedEvents?.find(e => e.id === event.id);
        if (originalEvent) {
            this.relatedEventClicked.emit(originalEvent);
        }
    }

    // Helper methods
    getStartDate(): Date {
        const event = this.eventData()?.event;
        return event?.startDate ? (typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate) : new Date();
    }

    getEndDate(): Date {
        const event = this.eventData()?.event;
        return event?.endDate ? (typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate) : new Date();
    }

    getHeroImage(): string {
        const event = this.eventData()?.event;
        return event?.images?.[0]?.url || '';
    }

    getBadgeText(): string {
        const event = this.eventData()?.event;
        if (!event) return '';

        if (event.currentParticipants && event.maxParticipants) {
            const percentage = (event.currentParticipants / event.maxParticipants) * 100;
            if (percentage > 90) return 'Se agota rápido';
            if (percentage > 75) return 'Pocas entradas';
        }

        return '';
    }

    getBadgeSeverity(): 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' {
        const event = this.eventData()?.event;
        if (!event) return 'primary';

        if (event.currentParticipants && event.maxParticipants) {
            const percentage = (event.currentParticipants / event.maxParticipants) * 100;
            if (percentage > 90) return 'danger';
            if (percentage > 75) return 'warn';
        }

        return 'info';
    }

    getOrganizerName(): string {
        const event = this.eventData()?.event;
        const firstName = event?.speakers?.[0]?.firstName || '';
        const lastName = event?.speakers?.[0]?.lastName || '';
        return `${firstName} ${lastName}`.trim() || 'Organizador';
    }

    getOrganizerAvatar(): string {
        // Placeholder - you might want to add avatar to Speaker interface
        return '';
    }

    getOrganizerBio(): string {
        const event = this.eventData()?.event;
        return event?.speakers?.[0]?.bio || 'Sin biografía disponible';
    }

    getOrganizerFollowers(): number {
        // Placeholder - you might want to add followers to organizer data
        return Math.floor(Math.random() * 1000) + 100;
    }

    getEventPrice(): number {
        // Placeholder - you might want to add price to Event interface
        return Math.floor(Math.random() * 100) + 20;
    }

    getPriceBadge(): string {
        return '';
    }

    isFollowingOrganizer(): boolean {
        // Placeholder
        return false;
    }

    getEventDuration(): string {
        const event = this.eventData()?.event;
        if (!event) return '';

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

    isVirtualEvent(): boolean {
        const event = this.eventData()?.event;
        return !!event?.virtualPlatformLink;
    }

    getFullAddress(): string {
        const event = this.eventData()?.event;
        if (!event?.addresses || event.addresses.length === 0) return '';

        const address = event.addresses[0];
        return `${address.street || ''}, ${address.city || ''}, ${address.country || ''}`.replace(/^,\s*|,\s*$/g, '');
    }

    getVenueName(): string {
        // Placeholder - you might want to add venue name to Address interface
        return '';
    }

    getVirtualPlatform(): string {
        const event = this.eventData()?.event;
        if (!event?.virtualPlatformLink) return '';

        if (event.virtualPlatformLink.includes('teams')) return 'Microsoft Teams';
        if (event.virtualPlatformLink.includes('zoom')) return 'Zoom';
        if (event.virtualPlatformLink.includes('meet')) return 'Google Meet';

        return 'Plataforma Virtual';
    }

    getEventArtists() {
        const event = this.eventData()?.event;
        return event?.speakers?.map(speaker => ({
            name: `${speaker.firstName} ${speaker.lastName}`,
            role: 'Ponente',
            bio: speaker.bio || ''
        })) || [];
    }

    getEventTags(): string[] {
        const event = this.eventData()?.event;
        const tags: string[] = [];

        if (event?.eventType) tags.push(event.eventType);
        if (event?.modality) tags.push(event.modality);

        return tags;
    }

    getOrganizerSocialLinks() {
        // Placeholder - you might want to add social links to organizer data
        return [];
    }

    getEventLocationFromEvent(event: any): string {
        if (event?.addresses && event.addresses.length > 0) {
            const address = event.addresses[0];
            return `${address.city || ''}, ${address.country || ''}`.replace(/^,\s*|,\s*$/g, '') || 'Sin ubicación';
        }
        return event?.virtualPlatformLink ? 'Evento Virtual' : 'Sin ubicación';
    }

    getSlideshowImages(): ImgProps[] {
        const event = this.eventData()?.event;
        if (!event?.images || event.images.length === 0) {
            // Return default slideshow images if no event images
            return [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                    alt: 'Evento',
                    title: event?.name || 'Evento',
                    description: event?.description || 'Imagen del evento'
                }
            ];
        }

        // Transform event images to ImgProps format
        return event.images.map((img: any, index: number) => ({
            id: img.id || index + 1,
            url: img.url,
            alt: img.description || event.name,
            title: event.name,
            description: img.description || event.description
        }));
    }

    getRelatedEventsAsEvents(): Event[] {
        // Datos falsos estáticos para mostrar el carrusel
        return [
            {
                id: 2,
                name: 'Conferencia de Desarrollo Web',
                description: 'Aprende las últimas tecnologías web',
                startDate: new Date('2024-04-15T09:00:00.000Z'),
                endDate: new Date('2024-04-15T17:00:00.000Z'),
                addresses: [],
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
                location: 'Evento Virtual',
                speakers: [],
                participants: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                name: 'Workshop de React Avanzado',
                description: 'Domina React con hooks y context',
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
                description: 'Descubre las nuevas características de Angular 20',
                startDate: new Date('2024-05-10T14:00:00.000Z'),
                endDate: new Date('2024-05-10T18:00:00.000Z'),
                addresses: [],
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
                description: 'Competencia de programación para crear soluciones innovadoras',
                startDate: new Date('2024-05-25T08:00:00.000Z'),
                endDate: new Date('2024-05-26T20:00:00.000Z'),
                addresses: [],
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
                description: 'Encuentro mensual de desarrolladores JavaScript',
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

}
