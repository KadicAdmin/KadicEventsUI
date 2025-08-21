import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/events-list.page').then(m => m.EventsListPage)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/event-create.page').then(m => m.EventCreatePage)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/event-edit.page').then(m => m.EventEditPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/event-details.page').then(m => m.EventDetailsPage)
  }
];