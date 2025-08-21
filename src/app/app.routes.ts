import { Routes } from '@angular/router';
// import { authGuard, adminGuard, guestGuard } from './core'; // Temporalmente desactivado

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        // canActivate: [guestGuard], // Temporalmente desactivado
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'dashboard',
        // canActivate: [authGuard], // Temporalmente desactivado
        loadComponent: () => import('./features/dashboard/pages/dashboard.page').then(m => m.DashboardPage)
    },
    {
        path: 'events',
        // canActivate: [authGuard], // Temporalmente desactivado
        loadChildren: () => import('./features/events/events.routes').then(m => m.eventsRoutes)
    },
    {
        path: 'speakers',
        // canActivate: [authGuard, adminGuard], // Temporalmente desactivado
        loadChildren: () => import('./features/speakers/speakers.routes').then(m => m.speakersRoutes)
    },
    {
        path: 'participants',
        // canActivate: [authGuard], // Temporalmente desactivado
        loadChildren: () => import('./features/participant/participants.routes').then(m => m.participantsRoutes)
    },
    {
        path: 'admin',
        // canActivate: [authGuard, adminGuard], // Temporalmente desactivado
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
