import { Component, input, output } from "@angular/core";
import { NavTab } from "@shared/components/organisms/nav-tab/nav-tab";
import { Slideshows } from "@shared/components/organisms/slideshows/slideshows";
import { CategoryCardComponent } from "@shared/components/organisms/category-card/category-card.component";
import { EventCarouselComponent } from "@shared/components/organisms/event-carousel/event-carousel.component";
import { CardsListComponent } from "@shared/components/organisms/event-card.component/event.card.component.component";
import { Event } from "../../../../../core/models";
import { ImgProps, Tab } from "../../../../../core/models/core.models";

@Component({
    selector: 'app-event-list-template',
    templateUrl: './event-list-template.html',
    standalone: true,
    imports: [Slideshows, NavTab, CategoryCardComponent, EventCarouselComponent, CardsListComponent],
})
export class EventListTemplate {
    // Inputs del page
    readonly events = input<Event[]>([]);
    readonly slideshowImages = input<ImgProps[]>([]);
    readonly tabs = input<Tab[]>([]);
    readonly loading = input<boolean>(false);
    readonly activeTab = input<string>('all');

    // Output para comunicación con el page
    readonly tabChanged = output<string>();
    readonly eventClicked = output<Event>();
    readonly viewAllClicked = output<void>();

    onTabChanged(tabId: string): void {
        this.tabChanged.emit(tabId);
    }

    onEventClick(event: Event): void {
        this.eventClicked.emit(event);
    }

    onViewAllClick(): void {
        this.viewAllClicked.emit();
    }
}