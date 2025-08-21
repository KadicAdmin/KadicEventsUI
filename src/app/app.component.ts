import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AuthService } from './core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, ButtonModule, TooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  title = 'kadic-events-ui';

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Events',
      icon: 'pi pi-calendar',
      routerLink: '/events'
    },
    {
      label: 'Participants',
      icon: 'pi pi-users',
      routerLink: '/participants'
    },
    {
      label: 'Admin',
      icon: 'pi pi-cog',
      visible: true,
      items: [
        {
          label: 'Speakers',
          icon: 'pi pi-user',
          routerLink: '/speakers'
        },
        {
          label: 'Maintenance',
          icon: 'pi pi-wrench',
          routerLink: '/admin'
        }
      ]
    }
  ];

  get isAuthenticated() {
    return true;
  }

  get currentUser() {
    return { firstName: 'Developer', lastName: 'User' };
  }

  logout(): void {
    // this.authService.logout(); // Temporalmente desactivado
    // this.router.navigate(['/auth/login']); // Temporalmente desactivado
    console.log('Logout clicked - funcionalidad temporalmente desactivada');
  }
}
