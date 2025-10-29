/**
 * Mock data for events
 */

import { Event } from '../../models/event.models';

export const MOCK_EVENTS: Event[] = [
    {
        id: 1,
        name: "Conferencia de Tecnología 2024",
        description: "Una conferencia anual sobre las últimas tendencias en tecnología, inteligencia artificial y desarrollo de software. Incluye workshops prácticos y networking.",
        maxParticipants: 500,
        currentParticipants: 287,
        isActive: true,
        eventTypeId: 1,
        eventType: "Conferencia",
        address: {
            id: 1,
            street: "Av. Principal 123",
            city: "Santo Domingo",
            state: "Distrito Nacional",
            country: "República Dominicana",
            zipCode: "10101",
            latitude: 18.4861,
            longitude: -69.9312
        },
        images: [
            {
                eventId: 1,
                imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
                caption: "Imagen principal del evento",
                isMain: true,
                createAt: new Date().toISOString()
            }
        ],
        eventDates: [
            {
                id: 1,
                date: "2024-03-15",
                talks: [
                    {
                        id: 1,
                        title: "Introducción a Angular 19",
                        description: "Nuevas características y mejores prácticas",
                        duration: 60,
                        speakerId: 1,
                        startTime: "2024-03-15T09:00:00",
                        endTime: "2024-03-15T10:00:00"
                    },
                    {
                        id: 2,
                        title: "Microservicios con Node.js",
                        description: "Arquitectura de microservicios escalable",
                        duration: 90,
                        speakerId: 2,
                        startTime: "2024-03-15T10:30:00",
                        endTime: "2024-03-15T12:00:00"
                    }
                ],
                speakers: [
                    {
                        id: 1,
                        name: "Juan",
                        lastName: "Pérez",
                        birthDay: "1985-05-15T00:00:00",
                        gendersId: 1,
                        countriesId: 1,
                        email: "juan@example.com",
                        phoneNumber: "1234567890",
                        commentary: "Experto en Angular",
                        academicDegreesId: 1,
                        academicLevelsId: 1,
                        areaOfStudyId: 1,
                        profileImageUrl: "https://example.com/juan.jpg"
                    },
                    {
                        id: 2,
                        name: "María",
                        lastName: "García",
                        birthDay: "1990-08-22T00:00:00",
                        gendersId: 2,
                        countriesId: 1,
                        email: "maria@example.com",
                        phoneNumber: "0987654321",
                        commentary: "Especialista en Node.js",
                        academicDegreesId: 2,
                        academicLevelsId: 2,
                        areaOfStudyId: 2,
                        profileImageUrl: "https://example.com/maria.jpg"
                    }
                ],
                schedules: [
                    {
                        id: 1,
                        startTime: "2024-03-15T08:30:00",
                        endTime: "2024-03-15T09:00:00",
                        isBreak: false,
                        breakDescription: "Registro y café de bienvenida"
                    },
                    {
                        id: 2,
                        startTime: "2024-03-15T09:00:00",
                        endTime: "2024-03-15T10:00:00",
                        talkId: 1,
                        isBreak: false
                    },
                    {
                        id: 3,
                        startTime: "2024-03-15T10:00:00",
                        endTime: "2024-03-15T10:30:00",
                        isBreak: true,
                        breakDescription: "Pausa para café"
                    },
                    {
                        id: 4,
                        startTime: "2024-03-15T10:30:00",
                        endTime: "2024-03-15T12:00:00",
                        talkId: 2,
                        isBreak: false
                    }
                ],
                modalities: [
                    {
                        id: 1,
                        name: "Híbrido",
                        isOnline: true,
                        isInPerson: true,
                        virtualPlatformLink: "https://zoom.us/j/123456789"
                    }
                ],
                locations: [
                    {
                        id: 1,
                        address: {
                            street: "Av. Principal 123",
                            city: "Santo Domingo",
                            state: "Distrito Nacional",
                            country: "República Dominicana",
                            zipCode: "10101"
                        },
                        latitude: 18.4861,
                        longitude: -69.9312,
                        isOnline: true,
                        isInPerson: true,
                        virtualPlatformLink: "https://zoom.us/j/123456789"
                    }
                ]
            },
            {
                id: 2,
                date: "2024-03-16",
                talks: [
                    {
                        id: 3,
                        title: "Machine Learning con Python",
                        description: "Introducción al ML y casos de uso",
                        duration: 120,
                        speakerId: 3,
                        startTime: "2024-03-16T09:00:00",
                        endTime: "2024-03-16T11:00:00"
                    }
                ],
                speakers: [
                    {
                        id: 3,
                        name: "Carlos",
                        lastName: "López",
                        birthDay: "1988-12-10T00:00:00",
                        gendersId: 1,
                        countriesId: 1,
                        email: "carlos@example.com",
                        phoneNumber: "5555555555",
                        commentary: "Especialista en Machine Learning",
                        academicDegreesId: 3,
                        academicLevelsId: 3,
                        areaOfStudyId: 3,
                        profileImageUrl: "https://example.com/carlos.jpg"
                    }
                ],
                schedules: [
                    {
                        id: 5,
                        startTime: "2024-03-16T08:30:00",
                        endTime: "2024-03-16T09:00:00",
                        isBreak: false,
                        breakDescription: "Registro y café"
                    },
                    {
                        id: 6,
                        startTime: "2024-03-16T09:00:00",
                        endTime: "2024-03-16T11:00:00",
                        talkId: 3,
                        isBreak: false
                    }
                ],
                modalities: [
                    {
                        id: 2,
                        name: "Presencial",
                        isOnline: false,
                        isInPerson: true
                    }
                ],
                locations: [
                    {
                        id: 2,
                        address: {
                            street: "Centro de Convenciones",
                            city: "Santo Domingo",
                            state: "Distrito Nacional",
                            country: "República Dominicana"
                        },
                        latitude: 18.4729,
                        longitude: -69.9116,
                        isOnline: false,
                        isInPerson: true
                    }
                ]
            }
        ],
        participants: []
    },
    {
        id: 2,
        name: "Workshop de React Avanzado",
        description: "Workshop intensivo sobre React 18, hooks avanzados, performance y testing.",
        maxParticipants: 50,
        currentParticipants: 32,
        isActive: true,
        eventTypeId: 2,
        eventType: "Workshop",
        address: {
            id: 2,
            street: "Calle Tecnológica 456",
            city: "Santiago",
            state: "Santiago",
            country: "República Dominicana",
            zipCode: "51000",
            latitude: 19.4517,
            longitude: -70.6970
        },
        images: [
            {
                eventId: 2,
                imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
                caption: "Workshop de React",
                isMain: true,
                createAt: new Date().toISOString()
            }
        ],
        eventDates: [
            {
                id: 3,
                date: "2024-03-20",
                talks: [
                    {
                        id: 4,
                        title: "React 18 y Concurrent Features",
                        description: "Explorando las nuevas características de React 18",
                        duration: 180,
                        speakerId: 4,
                        startTime: "2024-03-20T09:00:00",
                        endTime: "2024-03-20T12:00:00"
                    }
                ],
                speakers: [
                    {
                        id: 4,
                        name: "Ana",
                        lastName: "Rodríguez",
                        birthDay: "1992-03-25T00:00:00",
                        gendersId: 2,
                        countriesId: 1,
                        email: "ana@example.com",
                        phoneNumber: "4444444444",
                        commentary: "React Expert y Tech Lead",
                        academicDegreesId: 4,
                        academicLevelsId: 4,
                        areaOfStudyId: 4,
                        profileImageUrl: "https://example.com/ana.jpg"
                    }
                ],
                schedules: [
                    {
                        id: 7,
                        startTime: "2024-03-20T08:30:00",
                        endTime: "2024-03-20T09:00:00",
                        isBreak: false,
                        breakDescription: "Registro y café"
                    },
                    {
                        id: 8,
                        startTime: "2024-03-20T09:00:00",
                        endTime: "2024-03-20T12:00:00",
                        talkId: 4,
                        isBreak: false
                    }
                ],
                modalities: [
                    {
                        id: 3,
                        name: "Virtual",
                        isOnline: true,
                        isInPerson: false,
                        virtualPlatformLink: "https://meet.google.com/abc-defg-hij"
                    }
                ],
                locations: [
                    {
                        id: 3,
                        address: {
                            street: "Virtual",
                            city: "Online",
                            state: "Online",
                            country: "Online"
                        },
                        latitude: undefined,
                        longitude: undefined,
                        isOnline: true,
                        isInPerson: false,
                        virtualPlatformLink: "https://meet.google.com/abc-defg-hij"
                    }
                ]
            }
        ],
        participants: []
    },
    {
        id: 3,
        name: "Summit de Innovación 2024",
        description: "Evento enfocado en innovación, startups y tecnología emergente.",
        maxParticipants: 300,
        currentParticipants: 120,
        isActive: true,
        eventTypeId: 3,
        eventType: "Summit",
        address: {
            id: 3,
            street: "Av. España 789",
            city: "Santo Domingo Este",
            state: "Santo Domingo",
            country: "República Dominicana",
            zipCode: "11519",
            latitude: 18.4750,
            longitude: -69.8550
        },
        images: [
            {
                eventId: 3,
                imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
                caption: "Innovación y startups",
                isMain: true,
                createAt: new Date().toISOString()
            }
        ],
        eventDates: [
            {
                id: 4,
                date: "2024-04-10",
                talks: [
                    {
                        id: 6,
                        title: "Tendencias en IA Generativa",
                        description: "Casos prácticos y oportunidades de negocio",
                        duration: 75,
                        speakerId: 5,
                        startTime: "2024-04-10T10:00:00",
                        endTime: "2024-04-10T11:15:00"
                    }
                ],
                speakers: [
                    {
                        id: 5,
                        name: "Lucía",
                        lastName: "Martínez",
                        birthDay: "1987-07-18T00:00:00",
                        gendersId: 2,
                        countriesId: 1,
                        email: "lucia@example.com",
                        phoneNumber: "3333333333",
                        commentary: "Investigadora en IA",
                        academicDegreesId: 5,
                        academicLevelsId: 5,
                        areaOfStudyId: 5,
                        profileImageUrl: "https://example.com/lucia.jpg"
                    }
                ],
                schedules: [
                    {
                        id: 9,
                        startTime: "2024-04-10T09:30:00",
                        endTime: "2024-04-10T10:00:00",
                        isBreak: false,
                        breakDescription: "Registro"
                    }
                ],
                modalities: [
                    {
                        id: 4,
                        name: "Presencial",
                        isOnline: false,
                        isInPerson: true
                    }
                ],
                locations: [
                    {
                        id: 4,
                        address: {
                            street: "Centro Innovador",
                            city: "Santo Domingo Este",
                            state: "Santo Domingo",
                            country: "República Dominicana",
                            zipCode: "11519"
                        },
                        latitude: 18.4750,
                        longitude: -69.8550,
                        isOnline: false,
                        isInPerson: true
                    }
                ]
            }
        ],
        participants: []
    }
];

// Slideshow images mock
export const MOCK_SLIDESHOW_IMAGES = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
        alt: "Conferencia de Tecnología",
        title: "Conferencia de Tecnología"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
        alt: "Workshop de Desarrollo",
        title: "Workshop de Desarrollo"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
        alt: "React Workshop",
        title: "React Workshop"
    }
];

// Tabs mock
export const MOCK_TABS = [
    { id: 'all', label: 'Todos los Eventos', icon: 'pi pi-calendar' },
    { id: 'conferences', label: 'Conferencias', icon: 'pi pi-users' },
    { id: 'workshops', label: 'Workshops', icon: 'pi pi-cog' },
    { id: 'online', label: 'Online', icon: 'pi pi-desktop' },
    { id: 'in-person', label: 'Presencial', icon: 'pi pi-map-marker' }
];

export const MOCK_EVENT_DETAIL_DATA: Event[] =
    [
        {
            id: 2,
            name: 'Conferencia de Desarrollo Web',
            description: 'Aprende las últimas tecnologías web',
            address: {
                id: 1,
                street: 'Virtual',
                city: 'Online',
                state: 'Online',
                country: 'Online'
            },
            eventDates: [
                {
                    id: 1,
                    date: '2024-04-15',
                    talks: [],
                    speakers: [],
                    schedules: [],
                    modalities: [],
                    locations: []
                }
            ],
            maxParticipants: 100,
            currentParticipants: 45,
            isActive: true,
            images: [
                {
                    eventId: 2,
                    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
                    caption: 'Conferencia de desarrollo web',
                    isMain: true,
                    createAt: new Date().toISOString()
                }
            ],
            eventTypeId: 1,
            eventType: 'Conference',
            participants: [],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            name: 'Workshop de React Avanzado',
            description: 'Domina React con hooks y context',
            address: {
                id: 2,
                street: 'Virtual',
                city: 'Online',
                state: 'Online',
                country: 'Online'
            },
            eventDates: [
                {
                    id: 2,
                    date: '2024-04-20',
                    talks: [],
                    speakers: [],
                    schedules: [],
                    modalities: [],
                    locations: []
                }
            ],
            maxParticipants: 50,
            currentParticipants: 23,
            isActive: true,
            images: [
                {
                    eventId: 3,
                    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
                    caption: 'Workshop de React',
                    isMain: true,
                    createAt: new Date().toISOString()
                }
            ],
            eventTypeId: 2,
            eventType: 'Workshop',
            participants: [],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 4,
            name: 'Seminario de Angular 20',
            description: 'Descubre las nuevas características de Angular 20',
            address: {
                id: 3,
                street: 'Calle Principal 789',
                city: 'Santiago',
                state: 'Santiago',
                country: 'República Dominicana',
                zipCode: '51000',
                latitude: 19.4517,
                longitude: -70.6970
            },
            eventDates: [
                {
                    id: 3,
                    date: '2024-05-10',
                    talks: [],
                    speakers: [],
                    schedules: [],
                    modalities: [],
                    locations: []
                }
            ],
            maxParticipants: 80,
            currentParticipants: 67,
            isActive: true,
            images: [
                {
                    eventId: 4,
                    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
                    caption: 'Seminario de Angular',
                    isMain: true,
                    createAt: new Date().toISOString()
                }
            ],
            eventTypeId: 1,
            eventType: 'Seminar',
            participants: [],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 5,
            name: 'Hackathon de Innovación',
            description: 'Competencia de programación para crear soluciones innovadoras',
            address: {
                id: 4,
                street: 'Av. Innovación 321',
                city: 'Santo Domingo',
                state: 'Distrito Nacional',
                country: 'República Dominicana',
                zipCode: '10103',
                latitude: 18.4861,
                longitude: -69.9312
            },
            eventDates: [
                {
                    id: 4,
                    date: '2024-05-25',
                    talks: [],
                    speakers: [],
                    schedules: [],
                    modalities: [],
                    locations: []
                }
            ],
            maxParticipants: 200,
            currentParticipants: 156,
            isActive: true,
            images: [
                {
                    eventId: 5,
                    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
                    caption: 'Hackathon de innovación',
                    isMain: true,
                    createAt: new Date().toISOString()
                }
            ],
            eventTypeId: 3,
            eventType: 'Hackathon',
            participants: [],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 6,
            name: 'Meetup de JavaScript',
            description: 'Encuentro mensual de desarrolladores JavaScript',
            address: {
                id: 5,
                street: 'Virtual',
                city: 'Online',
                state: 'Online',
                country: 'Online'
            },
            eventDates: [
                {
                    id: 5,
                    date: '2024-06-05',
                    talks: [],
                    speakers: [],
                    schedules: [],
                    modalities: [],
                    locations: []
                }
            ],
            maxParticipants: 60,
            currentParticipants: 42,
            isActive: true,
            images: [
                {
                    eventId: 6,
                    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
                    caption: 'Meetup de JavaScript',
                    isMain: true,
                    createAt: new Date().toISOString()
                }
            ],
            eventTypeId: 4,
            eventType: 'Meetup',
            participants: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];
