import { Routes } from '@angular/router';

export const participantsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/participants-list.page').then(m => m.ParticipantsListPage)
  }
];


export default participantsRoutes;