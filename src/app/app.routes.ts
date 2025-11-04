import { Routes } from '@angular/router';
import { ImageFileUpload } from '@shared/components/molecules/image-file-upload/image-file-upload';
import { ImageGalery } from '@shared/components/organisms/image-galery/image-galery';
// import { authGuard, adminGuard, guestGuard } from './core'; // Temporalmente desactivado

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    // canActivate: [guestGuard], // Temporalmente desactivado
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },

  {
    path: 'dashboard',
    // canActivate: [authGuard], // Temporalmente desactivado
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.page').then(
        (m) => m.DashboardPage
      ),
  },

  {
    path: 'events',
    // canActivate: [authGuard], // Temporalmente desactivado
    loadChildren: () =>
      import('./features/events/events.routes').then((m) => m.eventsRoutes),
  },

  {
    path: 'speakers',
    // canActivate: [authGuard, adminGuard], // Temporalmente desactivado
    loadChildren: () =>
      import('./features/speakers/speakers.routes').then(
        (m) => m.speakersRoutes
      ),
  },

  {
    path: 'participants',
    // canActivate: [authGuard], // Temporalmente desactivado
    loadChildren: () =>
      import('./features/participant/participants.routes').then(
        (m) => m.participantsRoutes
      ),
  },

  {
    path: 'admin',
    // canActivate: [authGuard, adminGuard], // Temporalmente desactivado
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },

  {
    path: 'upload file',
    component: ImageFileUpload,
  },

  {
    path: 'galery',
    component: ImageGalery,
  },

  {
    path: 'productcard',
    loadComponent: () =>
      import(
        '@shared/components/molecules/card/product-card-component/product.card.component'
      ).then((m) => m.ProductCardComponent),
  },

  {
    path: 'event cards',
    loadComponent: () =>
      import(
        '@shared/components/organisms/event-card.component/event.card.component.component'
      ).then((m) => m.CardsListComponent),
  },

  {
    path: 'category-event',
    loadComponent: () =>
      import(
        '@shared/components/organisms/category-card/category-card.component'
      ).then((m) => m.CategoryCardComponent),
  },

  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
