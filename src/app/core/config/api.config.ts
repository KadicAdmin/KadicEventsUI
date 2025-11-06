export const API_CONFIG = {
  baseUrl: 'https://dev-eventapi.kadictechnology.com/api',
  endpoints: {
    // Authentication
    auth: {
      login: '/Auth/login',
      register: '/Auth/register',
      refreshToken: '/Auth/refresh-token',
      forgotPassword: '/Auth/forgot-password',
      resetPassword: '/Auth/reset-password',
    },
    // Event
    events: {
      base: '/Event',
      getAll: '/Event/GetAll',
      getById: (id: number) => `/Event/${id}`,
      create: '/Event/CreateEvent',
      createOrUpdate: (id?: number) =>
        id
          ? `/Event/create-update-event/${id}`
          : '/Event/create-update-event/0',
      update: (id: number) => `/Event/${id}`,
      delete: (id: number) => `/Event/${id}`,
      search: '/Event/search',
      modality: {
        base: '/Modality',
        getAll: '/Modality/GetAll',
      },

      //EventTags
      eventTags: {
        base: '/Tags',
        getAll: '/Tags',
        getById: (id: number) => `/EventTags/${id}`,
        create: '/Tags',
        update: (id: number) => `/EventTags/${id}`,
        delete: (id: number) => `/EventTags/${id}`,
      },

      // Speakers
      speakers: {
        base: '/Speaker',
        getAll: '/Speaker/GetAll',
        getById: (id: number) => `/Speaker/${id}`,
        create: '/Speaker/Save',
        update: (id: number) => `/Speaker/`,
        delete: (id: number) => `/Speaker/${id}`,
        search: '/Speakers/search',
      },
      // Participants
      participants: {
        base: '/Participants',
        getAll: '/Participants',
        getById: (id: number) => `/Participants/${id}`,
        create: '/Participants',
        update: (id: number) => `/Participants/${id}`,
        delete: (id: number) => `/Participants/${id}`,
        search: '/Participants/search',
      },
      // Academic Degrees
      academicDegrees: {
        base: '/AcademicDegree',
        getAll: '/AcademicDegree',
        getById: (id: number) => `/AcademicDegree/${id}`,
        create: '/AcademicDegrees',
        update: (id: number) => `/AcademicDegrees/${id}`,
        delete: (id: number) => `/AcademicDegrees/${id}`,
      },
      // Academic Levels
      academicLevels: {
        base: '/AcademicLevel',
        getAll: '/AcademicLevel/GetAll',
        getById: (id: number) => `/AcademicLevel/${id}`,
        create: '/AcademicLevel',
        update: (id: number) => `/AcademicLevel/${id}`,
        delete: (id: number) => `/AcademicLevel/${id}`,
      },
      // Study Areas
      areaOfStudys: {
        base: '/AreaOfStudy',
        getAll: '/AreaOfStudy',
        getById: (id: number) => `/AreaOfStudy/${id}`,
        create: '/AreaOfStudys',
        update: (id: number) => `/AreaOfStudy/${id}`,
        delete: (id: number) => `/AreaOfStudy/${id}`,
      },
      // Educational Institutions
      educationalInstitutions: {
        base: '/EducationalInstitution',
        getAll: '/EducationalInstitution',
        getById: (id: number) => `/EducationalInstitution/${id}`,
        create: '/EducationalInstitution',
        update: (id: number) => `/EducationalInstitution/${id}`,
        delete: (id: number) => `/EducationalInstitution/${id}`,
      },

      //Gender
      gender: {
        base: '/Gender',
        getAll: '/Gender',
        getById: (id: number) => `/Gender/${id}`,
        create: '/Gender',
        update: (id: number) => `/Gender/${id}`,
        delete: (id: number) => `/Gender/${id}`,
      },

      // Country
      country: {
        base: '/Country/GetAll',
        getAll: '/Country/GetAll',
        getById: (id: number) => `/Country/GetAll${id}`,
        create: '/Gender',
        update: (id: number) => `/Country/GetAll${id}`,
        delete: (id: number) => `/Country/GetAll${id}`,
      },

      // Event Categories
      categories: {
        base: '/EventCategory',
        getAll: '/EventCategory',
        getById: (id: number) => `/EventCategory/${id}`,
        create: '/EventCategory',
        update: (id: number) => `/EventCategory/${id}`,
        delete: (id: number) => `/EventCategory/${id}`,
      },

      eventTypes: {
        base: '/EventType',
        getAll: '/EventType/GetAll',
        getById: (id: number) => `/EventType/${id}`,
        create: '/EventType/Create',
        update: (id: number) => `/EventType/${id}`,
        delete: (id: number) => `/EventType/${id}`,
      },
      // Modalities
      modalities: {
        base: '/Modalities',
        getAll: '/Modalities',
        getById: (id: number) => `/Modalities/${id}`,
        create: '/Modalities',
        update: (id: number) => `/Modalities/${id}`,
        delete: (id: number) => `/Modalities/${id}`,
      },
    },
  },
} as const;
