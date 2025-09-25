import { ImgProps, Tab } from "@core/models/core.models";

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
