import { Component, signal } from "@angular/core";
import { NavTab } from "@shared/components/organisms/nav-tab/nav-tab";
import { Slideshows } from "@shared/components/organisms/slideshows/slideshows";

@Component({
    selector: 'app-event-list-template',
    templateUrl: './event-list-template.html',
    standalone: true,
    imports: [Slideshows, NavTab],
})
export class EventListTemplate {
    readonly activeTab = signal<string>('all');
    onTabChanged(tabId: string): void {
        this.activeTab.set(tabId);
    }
}