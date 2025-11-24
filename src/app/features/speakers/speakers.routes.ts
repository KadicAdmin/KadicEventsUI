import { Routes } from '@angular/router';

export const speakersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/speakers-list.page').then(m => m.SpeakersListPage)
  }
];
