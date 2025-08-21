import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/admin-dashboard.page').then(m => m.AdminDashboardPage)
  }
];
