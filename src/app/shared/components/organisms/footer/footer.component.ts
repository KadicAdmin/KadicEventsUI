import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    currentYear = new Date().getFullYear();

    // Información de la empresa
    companyInfo = {
        name: 'Kadic Events',
        description: 'Plataforma integral para la gestión de eventos empresariales y corporativos.',
        email: 'info@kadicevents.com',
        phone: '+1 (555) 123-4567'
    };

    // Enlaces de navegación
    navigationLinks = [
        { label: 'Inicio', route: '/dashboard' },
        { label: 'Eventos', route: '/events' },
        { label: 'Participantes', route: '/participants' },
        { label: 'Ponentes', route: '/speakers' }
    ];

    // Enlaces legales
    legalLinks = [
        { label: 'Términos y Condiciones', route: '/terms' },
        { label: 'Política de Privacidad', route: '/privacy' },
        { label: 'Cookies', route: '/cookies' }
    ];

    // Redes sociales
    socialLinks = [
        { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com/company/kadicevents' },
        { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com/kadicevents' },
        { name: 'Facebook', icon: 'pi pi-facebook', url: 'https://facebook.com/kadicevents' },
        { name: 'Instagram', icon: 'pi pi-instagram', url: 'https://instagram.com/kadicevents' }
    ];
}
