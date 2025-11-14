import { Routes } from '@angular/router';
import { ImageGallery } from '@shared/components/organisms/image-gallery/image-gallery';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/admin-dashboard.page').then((m) => m.AdminDashboardPage),
  },

  {
    path: 'gallery',
    component: ImageGallery,
  },
];
