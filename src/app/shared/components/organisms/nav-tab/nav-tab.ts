import { Component, input, output } from '@angular/core';
import { TABS } from '@core/constants/core.contans';
import { Tab } from '@core/models/core.models';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-nav-tab',
  imports: [TabsModule],
  templateUrl: './nav-tab.html',
})
export class NavTab {
  readonly tabs = input<Tab[]>(TABS);
  readonly activeTab = input<string>('all');
  readonly tabChanged = output<string>();
}


