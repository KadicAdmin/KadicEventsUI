import { ImgProps, Tab } from "@core/models/core.models";
import { MenuItem } from "primeng/api";

export const IMAGES_SLIDESHOW: ImgProps[] = [
    {
        url: 'https://www.simpleaccountsweb.com/store/assets/img/product/empty-img.png',
        id: 1,
        alt: 'Image 1'

    },
    {
        url: 'https://www.simpleaccountsweb.com/store/assets/img/product/empty-img.png',
        id: 2,
        alt: 'Image 2'
    }
]

export const TABS: Tab[] = [
    {
        id: 'all',
        label: 'Todos',
        icon: 'pi pi-calendar'
    },
    {
        id: 'upcoming',
        label: 'Próximos',
        icon: 'pi pi-calendar'
    },
    {
        id: 'online',
        label: 'Online',
        icon: 'pi pi-calendar'
    },
    {
        id: 'weekend',
        label: 'Este fin de semana',
        icon: 'pi pi-calendar'
    }
]

export const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard'
    },
    {
        label: 'Events',
        icon: 'pi pi-calendar',
        routerLink: '/events',
        items: [
            {
                label: 'All Events',
                icon: 'pi pi-list',
                routerLink: '/events'
            },
            {
                label: 'Create Event',
                icon: 'pi pi-plus',
                routerLink: '/events/create'
            }
        ]
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
