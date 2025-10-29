import { Component, input, output, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, EventDetailData } from '@core/models';
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
import { } from '../../molecules/stat-list/stat-list.component';
import { PolicyItemComponent } from '../../molecules/policy-item/policy-item.component';
import { MOCK_EVENT_DETAIL_DATA } from '@core/mocks/mock-event/events-mock-data';


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

    // Cache for stable slideshow images to avoid ExpressionChanged errors
    readonly slideshowImages = signal<ImgProps[]>([]);
    readonly organizerFollowersSig = signal<number>(0);
    readonly eventPriceSig = signal<number>(0);

    constructor() {
        // Debug logs
        console.log('EventDetailTemplateComponent initialized');

        // Keep slideshow images stable across change detection cycles
        effect(() => {
            const data = this.eventData();
            const event = data?.event;
            if (!event?.images || event.images.length === 0) {
                this.slideshowImages.set([
                    {
                        id: 1,
                        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                        alt: event?.name || 'Evento',
                        title: event?.name || 'Evento',
                        description: event?.description || 'Imagen del evento'
                    }
                ]);
            } else {
                this.slideshowImages.set(
                    event.images.map((img: any, index: number) => ({
                        id: img.id || index + 1,
                        url: img.url,
                        alt: img.description || event.name,
                        title: event.name,
                        description: img.description || event.description
                    }))
                );
            }
        });

        // Initialize stable values that were previously computed on every CD
        effect(() => {
            const data = this.eventData();
            const event = data?.event;
            // Followers placeholder (stable per event load)
            this.organizerFollowersSig.set(Math.floor(Math.random() * 1000) + 100);
            // Price placeholder (stable per event load)
            this.eventPriceSig.set(Math.floor(Math.random() * 100) + 20);

            // Cache coordinates to prevent constant recalculation
            if (event?.address) {
                this.eventLatitudeSig.set(event.address.latitude || null);
                this.eventLongitudeSig.set(event.address.longitude || null);
            } else {
                this.eventLatitudeSig.set(null);
                this.eventLongitudeSig.set(null);
            }
        });
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
        return events.map(event => ({
            id: event.id,
            title: event.name,
            imageUrl: event.images?.[0]?.imageUrl,
            date: this.getEventStartDate(event),
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
        return this.getEventStartDate(event);
    }

    getEndDate(): Date {
        const event = this.eventData()?.event;
        return this.getEventEndDate(event);
    }

    getEventStartDate(event: any): Date {
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return new Date();
        }
        const dates = event.eventDates.map((eventDate: any) => new Date(eventDate.date));
        return new Date(Math.min(...dates.map((date: Date) => date.getTime())));
    }

    getEventEndDate(event: any): Date {
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return new Date();
        }
        const dates = event.eventDates.map((eventDate: any) => new Date(eventDate.date));
        return new Date(Math.max(...dates.map((date: Date) => date.getTime())));
    }

    getEventSpeakers(event: any): any[] {
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return [];
        }
        return event.eventDates.flatMap((eventDate: any) => eventDate.speakers || []);
    }

    getEventModality(event: any): string {
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return 'No especificada';
        }
        const modalities = event.eventDates.flatMap((eventDate: any) => eventDate.modalities || []);
        const hasOnline = modalities.some((mod: any) => mod.isOnline);
        const hasInPerson = modalities.some((mod: any) => mod.isInPerson);

        if (hasOnline && hasInPerson) {
            return 'Híbrido';
        } else if (hasOnline) {
            return 'Online';
        } else if (hasInPerson) {
            return 'Presencial';
        }
        return 'No especificada';
    }

    getHeroImage(): string {
        const event = this.eventData()?.event;
        return event?.images?.[0]?.imageUrl || '';
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
        const speakers = this.getEventSpeakers(event);
        if (speakers && speakers.length > 0) {
            const speaker = speakers[0];
            return `${speaker.firstName || ''} ${speaker.lastName || ''}`.trim() || 'Organizador';
        }
        return 'Organizador';
    }

    getOrganizerAvatar(): string {
        return '';
    }

    getOrganizerBio(): string {
        const event = this.eventData()?.event;
        const speakers = this.getEventSpeakers(event);
        if (speakers && speakers.length > 0) {
            return speakers[0].bio || 'Sin biografía disponible';
        }
        return 'Sin biografía disponible';
    }


    getPriceBadge(): string {
        return '';
    }

    isFollowingOrganizer(): boolean {
        return false;
    }

    getEventDuration(): string {
        const event = this.eventData()?.event;
        if (!event) return '';

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

    isVirtualEvent(): boolean {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return false;
        }
        const modalities = event.eventDates.flatMap((eventDate: any) => eventDate.modalities || []);
        return modalities.some((mod: any) => mod.isOnline && mod.virtualPlatformLink);
    }

    getFullAddress(): string {
        const event = this.eventData()?.event;
        if (!event?.address) return '';

        const address = event.address;
        return `${address.street || ''}, ${address.city || ''}, ${address.country || ''}`.replace(/^,\s*|,\s*$/g, '');
    }

    getVenueName(): string {
        // Placeholder - you might want to add venue name to Address interface
        return '';
    }

    getVirtualPlatform(): string {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return '';
        }

        const modalities = event.eventDates.flatMap((eventDate: any) => eventDate.modalities || []);
        const onlineModality = modalities.find((mod: any) => mod.isOnline && mod.virtualPlatformLink);

        if (!onlineModality || !onlineModality.virtualPlatformLink) {
            return '';
        }

        const link = onlineModality.virtualPlatformLink;
        if (link.includes('teams')) return 'Microsoft Teams';
        if (link.includes('zoom')) return 'Zoom';
        if (link.includes('meet')) return 'Google Meet';

        return 'Plataforma Virtual';
    }

    getVirtualPlatformLink(): string {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates || event.eventDates.length === 0) {
            return '';
        }

        const modalities = event.eventDates.flatMap((eventDate: any) => eventDate.modalities || []);
        const onlineModality = modalities.find((mod: any) => mod.isOnline && mod.virtualPlatformLink);

        return onlineModality?.virtualPlatformLink || '';
    }

    // Cached coordinates to prevent constant recalculation
    private eventLatitudeSig = signal<number | null>(null);
    private eventLongitudeSig = signal<number | null>(null);

    getEventLatitude(): number | null {
        return this.eventLatitudeSig();
    }

    getEventLongitude(): number | null {
        return this.eventLongitudeSig();
    }

    getEventDates(): any[] {
        const event = this.eventData()?.event;
        return event?.eventDates || [];
    }

    getEventDatesInfo(): any[] {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates) {
            return [];
        }

        return event.eventDates.map((eventDate: any) => ({
            id: eventDate.id,
            date: eventDate.date,
            speakersCount: eventDate.speakers?.length || 0,
            talksCount: eventDate.talks?.length || 0,
            schedulesCount: eventDate.schedules?.length || 0
        }));
    }

    getTotalSpeakers(): number {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates) {
            return 0;
        }

        const allSpeakers = event.eventDates.flatMap((eventDate: any) => eventDate.speakers || []);
        const uniqueSpeakers = new Set(allSpeakers.map((speaker: any) => speaker.id));
        return uniqueSpeakers.size;
    }

    getTotalTalks(): number {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates) {
            return 0;
        }

        return event.eventDates.reduce((total: number, eventDate: any) => {
            return total + (eventDate.talks?.length || 0);
        }, 0);
    }

    getAllTalks(): any[] {
        const event = this.eventData()?.event;
        if (!event || !event.eventDates) {
            return [];
        }

        return event.eventDates.flatMap((eventDate: any) => eventDate.talks || []);
    }

    formatEventDate(date: any): string {
        if (!date) return '';

        const eventDate = new Date(date);
        return eventDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTalkTime(time: any): string {
        if (!time) return '';

        const talkTime = new Date(time);
        return talkTime.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getEventArtists() {
        const event = this.eventData()?.event;
        const speakers = this.getEventSpeakers(event);
        return speakers.map((speaker: any) => ({
            name: `${speaker.firstName} ${speaker.lastName}`,
            role: 'Ponente',
            bio: speaker.bio || ''
        }));
    }

    getEventTags(): string[] {
        const event = this.eventData()?.event;
        const tags: string[] = [];

        if (event?.eventType) tags.push(event.eventType);
        const modality = this.getEventModality(event);
        if (modality && modality !== 'No especificada') tags.push(modality);

        return tags;
    }

    getOrganizerSocialLinks() {
        return [];
    }

    getEventLocationFromEvent(event: any): string {
        if (event?.address) {
            const address = event.address;
            return `${address.city || ''}, ${address.country || ''}`.replace(/^,\s*|,\s*$/g, '') || 'Sin ubicación';
        }
        const hasVirtualLink = this.isVirtualEvent();
        return hasVirtualLink ? 'Evento Virtual' : 'Sin ubicación';
    }

    getRelatedEventsAsEvents(): Event[] {
        const relatedEvents = MOCK_EVENT_DETAIL_DATA;
        return relatedEvents;
    }

}
