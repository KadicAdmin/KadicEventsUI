import { Routes } from '@angular/router';
import { CardsListComponent } from '@shared/components/organisms/event-card.component/event.card.component.component';
import { ProductCardComponent } from '@shared/components/molecules/card/product-card-component/product.card.component';
import { CategoryCardComponent } from '@shared/components/organisms/category-card/category-card.component';
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
    path: 'productcard',
    component: ProductCardComponent, //Esta ruta es solo para probar el Card2ComponentComponent
  },

  {
    path: 'event cards',
    component: CardsListComponent, //Esta ruta es solo para probar el DivCardComponentComponent
  },

  {
    path: 'category-event',
    component: CategoryCardComponent, //Esta ruta es solo para probar el CategoryCardComponent
  },

  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
