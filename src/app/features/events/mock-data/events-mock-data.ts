/**
 * Objeto falso completo para eventos - Para el equipo de backend
 * 
 * Este archivo contiene toda la estructura de datos que necesita el frontend
 * para mostrar los eventos correctamente en todos los componentes.
 */

import { Event } from '../../../core/models/event.models';
import { EventRequestDto, EventResp } from '../models/events.interfaces';

// ========================================
// MOCK DATA PARA EVENTOS
// ========================================

export const MOCK_EVENTS: Event[] = [
    {
        id: 1,
        name: "Conferencia de Tecnología 2024",
        description: "Una conferencia anual sobre las últimas tendencias en tecnología, inteligencia artificial y desarrollo de software. Incluye workshops prácticos y networking.",
        startDate: new Date("2024-03-15T09:00:00.000Z"),
        endDate: new Date("2024-03-16T18:00:00.000Z"),
        addresses: [
            {
                id: 1,
                street: "Av. Principal 123",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4861,
                longitude: -69.9312
            }
        ],
        maxParticipants: 500,
        currentParticipants: 287,
        isActive: true,
        images: [
            {
                id: 1,
                url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
                description: "Imagen principal del evento",
                isPrimary: true
            },
            {
                id: 2,
                url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
                description: "Workshop de desarrollo",
                isPrimary: false
            }
        ],
        eventTypeId: 1,
        modalityId: 5, // Offline
        eventType: "Conference",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Santo Domingo, República Dominicana",
        speakers: [
            {
                id: 1,
                firstName: "Juan",
                lastName: "Pérez",
                email: "juan.perez@email.com",
                phoneNumber: "+1-809-555-0101",
                bio: "Experto en desarrollo web con más de 10 años de experiencia",
                academicTitleId: 1,
                academicLevelId: 2,
                studyAreaId: 1,
                educationalInstitutionId: 1,
                isActive: true,
                academicTitle: { id: 1, name: "Ingeniero en Sistemas", isActive: true },
                academicLevel: { id: 2, name: "Universitario", level: 3, isActive: true },
                studyArea: { id: 1, name: "Tecnología", isActive: true },
                educationalInstitution: { id: 1, name: "Universidad Tecnológica", country: "República Dominicana", city: "Santo Domingo", isActive: true }
            }
        ],
        participants: [
            {
                id: 1,
                firstName: "María",
                lastName: "González",
                email: "maria.gonzalez@email.com",
                phoneNumber: "+1-809-555-0102",
                registrationDate: new Date("2024-02-15T10:30:00.000Z"),
                isConfirmed: true,
                isActive: true,
                eventId: 1,
                createdAt: new Date("2024-02-15T10:30:00.000Z"),
                updatedAt: new Date("2024-02-15T10:30:00.000Z")
            }
        ],
        createdAt: new Date("2024-01-15T08:00:00.000Z"),
        updatedAt: new Date("2024-02-20T14:30:00.000Z")
    },
    {
        id: 2,
        name: "Workshop de React Avanzado",
        description: "Aprende las técnicas más avanzadas de React, incluyendo hooks personalizados, context API y optimización de rendimiento.",
        startDate: new Date("2024-03-20T14:00:00.000Z"),
        endDate: new Date("2024-03-20T18:00:00.000Z"),
        addresses: [],
        maxParticipants: 50,
        currentParticipants: 32,
        isActive: true,
        images: [
            {
                id: 3,
                url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
                description: "Workshop de React",
                isPrimary: true
            }
        ],
        eventTypeId: 2,
        modalityId: 2, // Online
        eventType: "Workshop",
        modality: "Online",
        virtualPlatformLink: "https://meet.google.com/abc-defg-hij",
        location: "Virtual Event",
        speakers: [
            {
                id: 2,
                firstName: "Carlos",
                lastName: "Rodríguez",
                email: "carlos.rodriguez@email.com",
                phoneNumber: "+1-809-555-0103",
                bio: "Senior React Developer en empresa Fortune 500",
                academicTitleId: 2,
                academicLevelId: 2,
                studyAreaId: 1,
                educationalInstitutionId: 2,
                isActive: true,
                academicTitle: { id: 2, name: "Desarrollador Frontend", isActive: true },
                academicLevel: { id: 2, name: "Universitario", level: 3, isActive: true },
                studyArea: { id: 1, name: "Tecnología", isActive: true },
                educationalInstitution: { id: 2, name: "Instituto Tecnológico", country: "República Dominicana", city: "Santiago", isActive: true }
            }
        ],
        participants: [],
        createdAt: new Date("2024-02-01T09:00:00.000Z"),
        updatedAt: new Date("2024-02-15T16:45:00.000Z")
    },
    {
        id: 3,
        name: "Networking para Emprendedores",
        description: "Evento de networking enfocado en conectar emprendedores, inversionistas y mentores del ecosistema tecnológico dominicano.",
        startDate: new Date("2024-03-25T18:30:00.000Z"),
        endDate: new Date("2024-03-25T21:30:00.000Z"),
        addresses: [
            {
                id: 2,
                street: "Calle El Conde 456",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10201",
                latitude: 18.4769,
                longitude: -69.8866
            }
        ],
        maxParticipants: 100,
        currentParticipants: 78,
        isActive: true,
        images: [
            {
                id: 4,
                url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
                description: "Evento de networking",
                isPrimary: true
            }
        ],
        eventTypeId: 5,
        modalityId: 5, // Offline
        eventType: "Meeting",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Santo Domingo, República Dominicana",
        speakers: [],
        participants: [
            {
                id: 2,
                firstName: "Ana",
                lastName: "Martínez",
                email: "ana.martinez@email.com",
                phoneNumber: "+1-809-555-0104",
                registrationDate: new Date("2024-02-20T11:15:00.000Z"),
                isConfirmed: true,
                isActive: true,
                eventId: 3,
                createdAt: new Date("2024-02-20T11:15:00.000Z"),
                updatedAt: new Date("2024-02-20T11:15:00.000Z")
            },
            {
                id: 3,
                firstName: "Luis",
                lastName: "Fernández",
                email: "luis.fernandez@email.com",
                phoneNumber: "+1-809-555-0105",
                registrationDate: new Date("2024-02-22T13:45:00.000Z"),
                isConfirmed: true,
                isActive: true,
                eventId: 3,
                createdAt: new Date("2024-02-22T13:45:00.000Z"),
                updatedAt: new Date("2024-02-22T13:45:00.000Z")
            }
        ],
        createdAt: new Date("2024-02-10T10:00:00.000Z"),
        updatedAt: new Date("2024-02-25T09:15:00.000Z")
    },
    {
        id: 4,
        name: "Concierto de Rock Nacional",
        description: "Festival de rock con las mejores bandas nacionales e internacionales. Una noche llena de música y energía.",
        startDate: new Date("2024-04-05T20:00:00.000Z"),
        endDate: new Date("2024-04-06T02:00:00.000Z"),
        addresses: [
            {
                id: 4,
                street: "Estadio Quisqueya",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10001",
                latitude: 18.4861,
                longitude: -69.9312
            }
        ],
        maxParticipants: 15000,
        currentParticipants: 12800,
        isActive: true,
        images: [
            {
                id: 5,
                url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
                description: "Concierto de rock",
                isPrimary: true
            }
        ],
        eventTypeId: 3,
        modalityId: 5,
        eventType: "Concert",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Estadio Quisqueya, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-01-20T12:00:00.000Z"),
        updatedAt: new Date("2024-03-01T15:30:00.000Z")
    },
    {
        id: 5,
        name: "Boda de Ensueño",
        description: "Ceremonia y recepción de boda con decoración temática y cena de gala para 200 invitados.",
        startDate: new Date("2024-04-15T16:00:00.000Z"),
        endDate: new Date("2024-04-15T23:00:00.000Z"),
        addresses: [
            {
                id: 5,
                street: "Hacienda El Limón",
                city: "Santiago",
                state: "Santiago",
                country: "República Dominicana",
                zipCode: "51000",
                latitude: 19.4517,
                longitude: -70.6970
            }
        ],
        maxParticipants: 200,
        currentParticipants: 200,
        isActive: true,
        images: [
            {
                id: 6,
                url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
                description: "Boda romántica",
                isPrimary: true
            }
        ],
        eventTypeId: 4,
        modalityId: 5,
        eventType: "Wedding",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Hacienda El Limón, Santiago",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-01-05T08:00:00.000Z"),
        updatedAt: new Date("2024-02-28T10:15:00.000Z")
    },
    {
        id: 6,
        name: "Webinar de Marketing Digital",
        description: "Aprende estrategias avanzadas de marketing digital, SEO, SEM y redes sociales para empresas.",
        startDate: new Date("2024-04-20T10:00:00.000Z"),
        endDate: new Date("2024-04-20T12:00:00.000Z"),
        addresses: [],
        maxParticipants: 1000,
        currentParticipants: 750,
        isActive: true,
        images: [
            {
                id: 7,
                url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                description: "Webinar de marketing",
                isPrimary: true
            }
        ],
        eventTypeId: 1,
        modalityId: 2,
        eventType: "Conference",
        modality: "Online",
        virtualPlatformLink: "https://zoom.us/j/123456789",
        location: "Evento Virtual",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-02-15T09:00:00.000Z"),
        updatedAt: new Date("2024-03-10T14:20:00.000Z")
    },
    {
        id: 7,
        name: "Feria Gastronómica 2024",
        description: "Evento culinario con los mejores restaurantes, chefs y productos locales. Degustaciones y shows de cocina.",
        startDate: new Date("2024-05-01T11:00:00.000Z"),
        endDate: new Date("2024-05-03T20:00:00.000Z"),
        addresses: [
            {
                id: 6,
                street: "Centro de Convenciones",
                city: "Punta Cana",
                state: "La Altagracia",
                country: "República Dominicana",
                zipCode: "23000",
                latitude: 18.5601,
                longitude: -68.3725
            }
        ],
        maxParticipants: 5000,
        currentParticipants: 3200,
        isActive: true,
        images: [
            {
                id: 8,
                url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                description: "Feria gastronómica",
                isPrimary: true
            }
        ],
        eventTypeId: 5,
        modalityId: 5,
        eventType: "Meeting",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Centro de Convenciones, Punta Cana",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-01-30T10:30:00.000Z"),
        updatedAt: new Date("2024-03-05T16:45:00.000Z")
    },
    {
        id: 8,
        name: "Maratón de Santo Domingo",
        description: "Maratón internacional con rutas certificadas y categorías para todas las edades y niveles.",
        startDate: new Date("2024-05-15T06:00:00.000Z"),
        endDate: new Date("2024-05-15T12:00:00.000Z"),
        addresses: [
            {
                id: 7,
                street: "Malecón de Santo Domingo",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4735,
                longitude: -69.8974
            }
        ],
        maxParticipants: 3000,
        currentParticipants: 2850,
        isActive: true,
        images: [
            {
                id: 9,
                url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
                description: "Maratón deportivo",
                isPrimary: true
            }
        ],
        eventTypeId: 6,
        modalityId: 5,
        eventType: "Sports",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Malecón, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-01-10T07:00:00.000Z"),
        updatedAt: new Date("2024-03-12T11:30:00.000Z")
    },
    {
        id: 9,
        name: "Exposición de Arte Contemporáneo",
        description: "Exposición de artistas dominicanos e internacionales con obras de pintura, escultura y arte digital.",
        startDate: new Date("2024-05-25T09:00:00.000Z"),
        endDate: new Date("2024-06-25T18:00:00.000Z"),
        addresses: [
            {
                id: 8,
                street: "Museo de Arte Moderno",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4719,
                longitude: -69.8958
            }
        ],
        maxParticipants: 1000,
        currentParticipants: 450,
        isActive: true,
        images: [
            {
                id: 10,
                url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
                description: "Exposición de arte",
                isPrimary: true
            }
        ],
        eventTypeId: 7,
        modalityId: 5,
        eventType: "Exhibition",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Museo de Arte Moderno, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-02-20T14:00:00.000Z"),
        updatedAt: new Date("2024-03-15T09:45:00.000Z")
    },
    {
        id: 10,
        name: "Conferencia de Blockchain",
        description: "Evento sobre tecnología blockchain, criptomonedas y aplicaciones descentralizadas en Latinoamérica.",
        startDate: new Date("2024-06-10T09:00:00.000Z"),
        endDate: new Date("2024-06-10T17:00:00.000Z"),
        addresses: [
            {
                id: 9,
                street: "Hotel Intercontinental",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4769,
                longitude: -69.8866
            }
        ],
        maxParticipants: 300,
        currentParticipants: 280,
        isActive: true,
        images: [
            {
                id: 11,
                url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
                description: "Conferencia blockchain",
                isPrimary: true
            }
        ],
        eventTypeId: 1,
        modalityId: 5,
        eventType: "Conference",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Hotel Intercontinental, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-02-25T13:30:00.000Z"),
        updatedAt: new Date("2024-03-18T16:20:00.000Z")
    },
    {
        id: 11,
        name: "Workshop de Fotografía",
        description: "Curso práctico de fotografía profesional con equipos de última generación y técnicas avanzadas.",
        startDate: new Date("2024-06-15T14:00:00.000Z"),
        endDate: new Date("2024-06-15T18:00:00.000Z"),
        addresses: [
            {
                id: 10,
                street: "Studio Fotográfico",
                city: "Santiago",
                state: "Santiago",
                country: "República Dominicana",
                zipCode: "51000",
                latitude: 19.4517,
                longitude: -70.6970
            }
        ],
        maxParticipants: 20,
        currentParticipants: 18,
        isActive: true,
        images: [
            {
                id: 12,
                url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
                description: "Workshop de fotografía",
                isPrimary: true
            }
        ],
        eventTypeId: 2,
        modalityId: 5,
        eventType: "Workshop",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Studio Fotográfico, Santiago",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-03-01T11:15:00.000Z"),
        updatedAt: new Date("2024-03-20T14:10:00.000Z")
    },
    {
        id: 12,
        name: "Evento Corporativo Anual",
        description: "Reunión anual de la empresa con presentaciones, reconocimientos y actividades de team building.",
        startDate: new Date("2024-06-30T08:00:00.000Z"),
        endDate: new Date("2024-06-30T16:00:00.000Z"),
        addresses: [
            {
                id: 11,
                street: "Centro de Convenciones Barceló",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4861,
                longitude: -69.9312
            }
        ],
        maxParticipants: 500,
        currentParticipants: 500,
        isActive: true,
        images: [
            {
                id: 13,
                url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
                description: "Evento corporativo",
                isPrimary: true
            }
        ],
        eventTypeId: 8,
        modalityId: 5,
        eventType: "Corporate",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Centro de Convenciones Barceló, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-01-15T16:45:00.000Z"),
        updatedAt: new Date("2024-03-22T10:30:00.000Z")
    },
    {
        id: 13,
        name: "Festival de Cine Dominicano",
        description: "Festival anual de cine con proyecciones, debates y encuentros con directores y actores.",
        startDate: new Date("2024-07-05T19:00:00.000Z"),
        endDate: new Date("2024-07-15T23:00:00.000Z"),
        addresses: [
            {
                id: 12,
                street: "Cinemateca Nacional",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4719,
                longitude: -69.8958
            }
        ],
        maxParticipants: 2000,
        currentParticipants: 1650,
        isActive: true,
        images: [
            {
                id: 14,
                url: "https://images.unsplash.com/photo-1489599808151-9b4c9b7b2e7b?w=800&h=600&fit=crop",
                description: "Festival de cine",
                isPrimary: true
            }
        ],
        eventTypeId: 9,
        modalityId: 5,
        eventType: "Festival",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Cinemateca Nacional, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-02-10T12:20:00.000Z"),
        updatedAt: new Date("2024-03-25T15:50:00.000Z")
    },
    {
        id: 14,
        name: "Seminario de Liderazgo",
        description: "Seminario intensivo sobre liderazgo empresarial, gestión de equipos y desarrollo personal.",
        startDate: new Date("2024-07-20T09:00:00.000Z"),
        endDate: new Date("2024-07-21T17:00:00.000Z"),
        addresses: [
            {
                id: 13,
                street: "Universidad APEC",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4769,
                longitude: -69.8866
            }
        ],
        maxParticipants: 150,
        currentParticipants: 145,
        isActive: true,
        images: [
            {
                id: 15,
                url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
                description: "Seminario de liderazgo",
                isPrimary: true
            }
        ],
        eventTypeId: 1,
        modalityId: 5,
        eventType: "Conference",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Universidad APEC, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-02-28T10:00:00.000Z"),
        updatedAt: new Date("2024-03-30T13:15:00.000Z")
    },
    {
        id: 15,
        name: "Concierto de Jazz",
        description: "Noche de jazz con músicos internacionales en un ambiente íntimo y acogedor.",
        startDate: new Date("2024-08-10T20:30:00.000Z"),
        endDate: new Date("2024-08-11T00:00:00.000Z"),
        addresses: [
            {
                id: 14,
                street: "Teatro Nacional",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4735,
                longitude: -69.8974
            }
        ],
        maxParticipants: 800,
        currentParticipants: 720,
        isActive: true,
        images: [
            {
                id: 16,
                url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
                description: "Concierto de jazz",
                isPrimary: true
            }
        ],
        eventTypeId: 3,
        modalityId: 5,
        eventType: "Concert",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Teatro Nacional, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-03-05T15:30:00.000Z"),
        updatedAt: new Date("2024-04-02T11:45:00.000Z")
    },
    {
        id: 16,
        name: "Workshop de Cocina Dominicana",
        description: "Aprende a preparar los platos típicos dominicanos con chefs expertos en cocina tradicional.",
        startDate: new Date("2024-08-25T10:00:00.000Z"),
        endDate: new Date("2024-08-25T14:00:00.000Z"),
        addresses: [
            {
                id: 15,
                street: "Escuela de Gastronomía",
                city: "Santiago",
                state: "Santiago",
                country: "República Dominicana",
                zipCode: "51000",
                latitude: 19.4517,
                longitude: -70.6970
            }
        ],
        maxParticipants: 30,
        currentParticipants: 28,
        isActive: true,
        images: [
            {
                id: 17,
                url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                description: "Workshop de cocina",
                isPrimary: true
            }
        ],
        eventTypeId: 2,
        modalityId: 5,
        eventType: "Workshop",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Escuela de Gastronomía, Santiago",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-03-12T09:20:00.000Z"),
        updatedAt: new Date("2024-04-08T16:30:00.000Z")
    },
    {
        id: 17,
        name: "Conferencia de Turismo Sostenible",
        description: "Evento sobre turismo responsable, conservación ambiental y desarrollo sostenible en el Caribe.",
        startDate: new Date("2024-09-10T09:00:00.000Z"),
        endDate: new Date("2024-09-12T17:00:00.000Z"),
        addresses: [
            {
                id: 16,
                street: "Hotel Dreams Palm Beach",
                city: "Punta Cana",
                state: "La Altagracia",
                country: "República Dominicana",
                zipCode: "23000",
                latitude: 18.5601,
                longitude: -68.3725
            }
        ],
        maxParticipants: 400,
        currentParticipants: 380,
        isActive: true,
        images: [
            {
                id: 18,
                url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
                description: "Conferencia de turismo",
                isPrimary: true
            }
        ],
        eventTypeId: 1,
        modalityId: 5,
        eventType: "Conference",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Hotel Dreams Palm Beach, Punta Cana",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-03-18T14:15:00.000Z"),
        updatedAt: new Date("2024-04-15T12:40:00.000Z")
    },
    {
        id: 18,
        name: "Festival de Danza Folclórica",
        description: "Celebración de la cultura dominicana con presentaciones de danza folclórica, música y tradiciones.",
        startDate: new Date("2024-09-25T18:00:00.000Z"),
        endDate: new Date("2024-09-27T22:00:00.000Z"),
        addresses: [
            {
                id: 17,
                street: "Plaza de la Cultura",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4719,
                longitude: -69.8958
            }
        ],
        maxParticipants: 3000,
        currentParticipants: 2750,
        isActive: true,
        images: [
            {
                id: 19,
                url: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop",
                description: "Festival de danza",
                isPrimary: true
            }
        ],
        eventTypeId: 9,
        modalityId: 5,
        eventType: "Festival",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Plaza de la Cultura, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-03-25T11:45:00.000Z"),
        updatedAt: new Date("2024-04-20T09:25:00.000Z")
    },
    {
        id: 19,
        name: "Mesa Redonda de Innovación",
        description: "Discusión sobre innovación tecnológica, emprendimiento y transformación digital en República Dominicana.",
        startDate: new Date("2024-10-15T14:00:00.000Z"),
        endDate: new Date("2024-10-15T18:00:00.000Z"),
        addresses: [
            {
                id: 18,
                street: "Centro de Innovación",
                city: "Santo Domingo",
                state: "Distrito Nacional",
                country: "República Dominicana",
                zipCode: "10101",
                latitude: 18.4769,
                longitude: -69.8866
            }
        ],
        maxParticipants: 100,
        currentParticipants: 95,
        isActive: true,
        images: [
            {
                id: 20,
                url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
                description: "Mesa redonda",
                isPrimary: true
            }
        ],
        eventTypeId: 5,
        modalityId: 5,
        eventType: "Meeting",
        modality: "Offline",
        virtualPlatformLink: undefined,
        location: "Centro de Innovación, Santo Domingo",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-04-01T13:30:00.000Z"),
        updatedAt: new Date("2024-04-25T15:20:00.000Z")
    },
    {
        id: 20,
        name: "Conferencia Virtual de IA",
        description: "Evento online sobre inteligencia artificial, machine learning y su aplicación en diferentes industrias.",
        startDate: new Date("2024-10-30T10:00:00.000Z"),
        endDate: new Date("2024-10-30T16:00:00.000Z"),
        addresses: [],
        maxParticipants: 2000,
        currentParticipants: 1850,
        isActive: true,
        images: [
            {
                id: 21,
                url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
                description: "Conferencia de IA",
                isPrimary: true
            }
        ],
        eventTypeId: 1,
        modalityId: 2,
        eventType: "Conference",
        modality: "Online",
        virtualPlatformLink: "https://teams.microsoft.com/l/meetup-join/123456789",
        location: "Evento Virtual",
        speakers: [],
        participants: [],
        createdAt: new Date("2024-04-10T10:15:00.000Z"),
        updatedAt: new Date("2024-04-30T14:35:00.000Z")
    }
];

// ========================================
// MOCK DATA PARA TIPOS DE EVENTOS
// ========================================

export const MOCK_EVENT_TYPES = [
    { id: 1, name: "Conference", description: "Conferencias y charlas magistrales", isActive: true },
    { id: 2, name: "Workshop", description: "Talleres prácticos y hands-on", isActive: true },
    { id: 3, name: "Seminar", description: "Seminarios educativos", isActive: true },
    { id: 4, name: "Webinar", description: "Sesiones online educativas", isActive: true },
    { id: 5, name: "Meeting", description: "Reuniones y networking", isActive: true }
];

// ========================================
// MOCK DATA PARA MODALIDADES
// ========================================

export const MOCK_MODALITIES = [
    { id: 2, name: "Online", description: "Evento virtual", isActive: true },
    { id: 5, name: "Offline", description: "Evento presencial", isActive: true }
];

// ========================================
// MOCK DATA PARA SPEAKERS
// ========================================

export const MOCK_SPEAKERS = [
    {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@email.com",
        phone: "+1-809-555-0101",
        biography: "Experto en desarrollo web con más de 10 años de experiencia en tecnologías modernas.",
        academicTitleId: 1,
        academicLevelId: 2,
        studyAreaId: 1,
        educationalInstitutionId: 1,
        isActive: true,
        academicTitle: { id: 1, name: "Ingeniero en Sistemas", isActive: true },
        academicLevel: { id: 2, name: "Universitario", level: 3, isActive: true },
        studyArea: { id: 1, name: "Tecnología", isActive: true },
        educationalInstitution: { id: 1, name: "Universidad Tecnológica", country: "República Dominicana", city: "Santo Domingo", isActive: true },
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
        updatedAt: new Date("2024-01-01T00:00:00.000Z"),
        createdBy: "system",
        updatedBy: "system"
    },
    {
        id: 2,
        firstName: "Carlos",
        lastName: "Rodríguez",
        email: "carlos.rodriguez@email.com",
        phone: "+1-809-555-0103",
        biography: "Senior React Developer con experiencia en empresas Fortune 500 y proyectos de gran escala.",
        academicTitleId: 2,
        academicLevelId: 2,
        studyAreaId: 1,
        educationalInstitutionId: 2,
        isActive: true,
        academicTitle: { id: 2, name: "Desarrollador Frontend", isActive: true },
        academicLevel: { id: 2, name: "Universitario", level: 3, isActive: true },
        studyArea: { id: 1, name: "Tecnología", isActive: true },
        educationalInstitution: { id: 2, name: "Instituto Tecnológico", country: "República Dominicana", city: "Santiago", isActive: true },
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
        updatedAt: new Date("2024-01-01T00:00:00.000Z"),
        createdBy: "system",
        updatedBy: "system"
    }
];

// ========================================
// MOCK DATA PARA PARTICIPANTES
// ========================================

export const MOCK_PARTICIPANTS = [
    {
        id: 1,
        firstName: "María",
        lastName: "González",
        email: "maria.gonzalez@email.com",
        phoneNumber: "+1-809-555-0102",
        registrationDate: new Date("2024-02-15T10:30:00.000Z"),
        isConfirmed: true,
        isActive: true,
        eventId: 1,
        createdAt: new Date("2024-02-15T10:30:00.000Z"),
        updatedAt: new Date("2024-02-15T10:30:00.000Z")
    },
    {
        id: 2,
        firstName: "Ana",
        lastName: "Martínez",
        email: "ana.martinez@email.com",
        phoneNumber: "+1-809-555-0104",
        registrationDate: new Date("2024-02-20T11:15:00.000Z"),
        isConfirmed: true,
        isActive: true,
        eventId: 3,
        createdAt: new Date("2024-02-20T11:15:00.000Z"),
        updatedAt: new Date("2024-02-20T11:15:00.000Z")
    },
    {
        id: 3,
        firstName: "Luis",
        lastName: "Fernández",
        email: "luis.fernandez@email.com",
        phoneNumber: "+1-809-555-0105",
        registrationDate: new Date("2024-02-22T13:45:00.000Z"),
        isConfirmed: true,
        isActive: true,
        eventId: 3,
        createdAt: new Date("2024-02-22T13:45:00.000Z"),
        updatedAt: new Date("2024-02-22T13:45:00.000Z")
    }
];

// ========================================
// EJEMPLO DE REQUEST PARA CREAR EVENTO
// ========================================

export const MOCK_EVENT_REQUEST: EventRequestDto = {
    Name: "Nuevo Evento de Tecnología",
    EventTypeId: 1,
    ModalityId: 5,
    VirtualPlatformLink: null,
    StartDate: "2024-04-15T09:00:00.000Z",
    EndDate: "2024-04-15T18:00:00.000Z",
    ImagesNew: [
        {
            File: new File([''], 'event-image.jpg', { type: 'image/jpeg' }),
            Caption: "Imagen principal del evento",
            IsMain: true
        }
    ],
    ImagesToDelete: []
};

// ========================================
// EJEMPLO DE RESPONSE AL CREAR EVENTO
// ========================================

export const MOCK_EVENT_RESPONSE: EventResp = {
    message: "Evento creado exitosamente"
};

// ========================================
// MOCK DATA PARA CATEGORÍAS (USADAS EN EL TEMPLATE)
// ========================================

export const MOCK_CATEGORIES = [
    { icon: 'pi pi-music', label: 'Música' },
    { icon: 'pi pi-moon', label: 'Vida nocturna' },
    { icon: 'pi pi-palette', label: 'Artes escénicas y visuales' },
    { icon: 'pi pi-sun', label: 'Vacaciones' },
    { icon: 'pi pi-comments', label: 'Citas' },
    { icon: 'pi pi-desktop', label: 'Aficiones' },
    { icon: 'pi pi-chart-bar', label: 'Negocios' },
    { icon: 'pi pi-apple', label: 'Gastronomía' }
];

// ========================================
// MOCK DATA PARA TABS DE NAVEGACIÓN
// ========================================

export const MOCK_TABS = [
    { id: 'all', label: 'Todos los Eventos', icon: 'pi pi-list' },
    { id: 'upcoming', label: 'Próximos Eventos', icon: 'pi pi-calendar' },
    { id: 'online', label: 'Eventos Online', icon: 'pi pi-video' },
    { id: 'weekend', label: 'Este Fin de Semana', icon: 'pi pi-clock' }
];

// ========================================
// MOCK DATA PARA SLIDESHOW
// ========================================

export const MOCK_SLIDESHOW_IMAGES = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
        alt: "Conferencia de Tecnología",
        title: "Conferencia de Tecnología 2024",
        description: "Únete a la mayor conferencia de tecnología del país"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
        alt: "Workshop de Desarrollo",
        title: "Workshops Prácticos",
        description: "Aprende con expertos en sesiones hands-on"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop",
        alt: "Networking Event",
        title: "Networking Profesional",
        description: "Conecta con profesionales del ecosistema tech"
    }
];

/**
 * INSTRUCCIONES PARA EL EQUIPO DE BACKEND:
 * 
 * 1. ENDPOINTS REQUERIDOS:
 *    - GET /api/events - Obtener todos los eventos
 *    - GET /api/events/:id - Obtener evento por ID
 *    - POST /api/events - Crear nuevo evento
 *    - PUT /api/events/:id - Actualizar evento
 *    - DELETE /api/events/:id - Eliminar evento
 * 
 * 2. ESTRUCTURA DE DATOS:
 *    - Los eventos deben incluir relaciones con speakers, participants, addresses e images
 *    - Las fechas deben ser en formato ISO 8601
 *    - Los IDs deben ser únicos y auto-incrementales
 * 
 * 3. VALIDACIONES:
 *    - Name: requerido, mínimo 3 caracteres
 *    - EventTypeId: requerido, debe existir en la tabla event_types
 *    - ModalityId: requerido, debe existir en la tabla modalities
 *    - StartDate: requerido, debe ser fecha futura
 *    - EndDate: requerido, debe ser posterior a StartDate
 *    - VirtualPlatformLink: requerido solo si ModalityId es "Online"
 * 
 * 4. RESPONSE FORMAT:
 *    - Usar el formato ApiResponse<T> para todas las respuestas
 *    - Incluir mensajes de error descriptivos
 *    - Usar códigos HTTP apropiados (200, 201, 400, 404, 500)
 * 
 * 5. TABLAS RELACIONADAS:
 *    - event_types: id, name, description, is_active
 *    - modalities: id, name, description, is_active
 *    - speakers: incluir relaciones con academic_titles, academic_levels, study_areas, educational_institutions
 *    - participants: datos básicos del participante
 *    - addresses: información de ubicación del evento
 *    - event_images: imágenes del evento con metadata
 */
