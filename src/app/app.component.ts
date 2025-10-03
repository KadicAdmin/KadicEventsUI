import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { MENU_ITEMS } from '@core/constants/core.contans';
import { FooterComponent } from './shared/components/organisms/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, ButtonModule, TooltipModule, InputTextModule, AvatarModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kadic events';

  menuItems: MenuItem[] = MENU_ITEMS;

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
