import { ImgProps, Tab } from "@core/models/core.models";
import { MenuItem } from "primeng/api";

export const IMAGES_SLIDESHOW: ImgProps[] = [
    {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        id: 1,
        alt: 'Concierto de Rock',
        title: 'Rock Festival 2024',
        description: 'El evento de rock más esperado del año. Artistas internacionales y nacionales en un festival inolvidable.'
    },
    {
        url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        id: 2,
        alt: 'Conferencia de Tecnología',
        title: 'Tech Summit 2024',
        description: 'La cumbre tecnológica más importante del país. Innovación, networking y oportunidades de negocio.'
    },
    {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        id: 3,
        alt: 'Boda de Lujo',
        title: 'Wedding Expo 2024',
        description: 'La exposición de bodas más exclusiva. Proveedores premium y las últimas tendencias en eventos nupciales.'
    },
    {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        id: 4,
        alt: 'Evento Corporativo',
        title: 'Corporate Gala 2024',
        description: 'Gala corporativa de alto nivel con cena de gala, networking y reconocimientos empresariales.'
    },
    {
        url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        id: 5,
        alt: 'Festival de Comida',
        title: 'Food & Wine Festival',
        description: 'Festival gastronómico con los mejores chefs, vinos premium y experiencias culinarias únicas.'
    },
    {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        id: 6,
        alt: 'Seminario de Negocios',
        title: 'Business Seminar 2024',
        description: 'Seminario especializado en estrategias de negocio, liderazgo y desarrollo empresarial.'
    }
]

export const TABS: Tab[] = [
    {
        id: 'all',
        label: 'Todos los Eventos',
        icon: 'pi pi-calendar'
    },
    {
        id: 'concerts',
        label: 'Conciertos',
        icon: 'pi pi-music'
    },
    {
        id: 'conferences',
        label: 'Conferencias',
        icon: 'pi pi-users'
    },
    {
        id: 'weddings',
        label: 'Bodas',
        icon: 'pi pi-heart'
    },
    {
        id: 'corporate',
        label: 'Corporativos',
        icon: 'pi pi-briefcase'
    },
    {
        id: 'online',
        label: 'Eventos Online',
        icon: 'pi pi-video'
    }
]

export const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard'
    },
    {
        label: 'Eventos',
        icon: 'pi pi-calendar',
        routerLink: '/events',
        items: [
            {
                label: 'Todos los Eventos',
                icon: 'pi pi-list',
                routerLink: '/events'
            },
            {
                label: 'Crear Evento',
                icon: 'pi pi-plus',
                routerLink: '/events/create'
            },
            {
                label: 'Mis Eventos',
                icon: 'pi pi-bookmark',
                routerLink: '/events/my-events'
            }
        ]
    },
    {
        label: 'Taquillas',
        icon: 'pi pi-ticket',
        routerLink: '/tickets',
        items: [
            {
                label: 'Vender Entradas',
                icon: 'pi pi-shopping-cart',
                routerLink: '/tickets/sell'
            },
            {
                label: 'Reportes de Ventas',
                icon: 'pi pi-chart-bar',
                routerLink: '/tickets/reports'
            },
            {
                label: 'Validar Entradas',
                icon: 'pi pi-check-circle',
                routerLink: '/tickets/validate'
            }
        ]
    },
    {
        label: 'Participantes',
        icon: 'pi pi-users',
        routerLink: '/participants',
        items: [
            {
                label: 'Lista de Asistentes',
                icon: 'pi pi-list',
                routerLink: '/participants'
            },
            {
                label: 'Registro Manual',
                icon: 'pi pi-user-plus',
                routerLink: '/participants/register'
            }
        ]
    },
    {
        label: 'Administración',
        icon: 'pi pi-cog',
        visible: true,
        items: [
            {
                label: 'Organizadores',
                icon: 'pi pi-user',
                routerLink: '/admin/organizers'
            },
            {
                label: 'Configuración',
                icon: 'pi pi-wrench',
                routerLink: '/admin/settings'
            },
            {
                label: 'Reportes',
                icon: 'pi pi-chart-line',
                routerLink: '/admin/reports'
            }
        ]
    }
];
