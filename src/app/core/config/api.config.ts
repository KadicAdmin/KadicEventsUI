export const API_CONFIG = {
  baseUrl: 'http://kadictechnology-001-site2.ltempurl.com/api',
  endpoints: {
    // Authentication
    auth: {
      login: '/Auth/login',
      register: '/Auth/register',
      refreshToken: '/Auth/refresh-token',
      forgotPassword: '/Auth/forgot-password',
      resetPassword: '/Auth/reset-password'
    },
    // Event
    events: {
      base: '/Event/GetAll',
      getAll: '/Event/GetAll',
      getById: (id: number) => `/Event/${id}`,
      create: '/Event',
      update: (id: number) => `/Event/${id}`,
      delete: (id: number) => `/Event/${id}`,
      search: '/Event/search'
    },
    // Speakers
    speakers: {
      base: '/Speakers',
      getAll: '/Speakers',
      getById: (id: number) => `/Speakers/${id}`,
      create: '/Speakers',
      update: (id: number) => `/Speakers/${id}`,
      delete: (id: number) => `/Speakers/${id}`,
      search: '/Speakers/search'
    },
    // Participants
    participants: {
      base: '/Participants',
      getAll: '/Participants',
      getById: (id: number) => `/Participants/${id}`,
      create: '/Participants',
      update: (id: number) => `/Participants/${id}`,
      delete: (id: number) => `/Participants/${id}`,
      search: '/Participants/search'
    },
    // Academic Titles
    academicTitles: {
      base: '/AcademicTitles',
      getAll: '/AcademicTitles',
      getById: (id: number) => `/AcademicTitles/${id}`,
      create: '/AcademicTitles',
      update: (id: number) => `/AcademicTitles/${id}`,
      delete: (id: number) => `/AcademicTitles/${id}`
    },
    // Academic Levels
    academicLevels: {
      base: '/AcademicLevels',
      getAll: '/AcademicLevels',
      getById: (id: number) => `/AcademicLevels/${id}`,
      create: '/AcademicLevels',
      update: (id: number) => `/AcademicLevels/${id}`,
      delete: (id: number) => `/AcademicLevels/${id}`
    },
    // Study Areas
    studyAreas: {
      base: '/StudyAreas',
      getAll: '/StudyAreas',
      getById: (id: number) => `/StudyAreas/${id}`,
      create: '/StudyAreas',
      update: (id: number) => `/StudyAreas/${id}`,
      delete: (id: number) => `/StudyAreas/${id}`
    },
    // Educational Institutions
    educationalInstitutions: {
      base: '/EducationalInstitutions',
      getAll: '/EducationalInstitutions',
      getById: (id: number) => `/EducationalInstitutions/${id}`,
      create: '/EducationalInstitutions',
      update: (id: number) => `/EducationalInstitutions/${id}`,
      delete: (id: number) => `/EducationalInstitutions/${id}`
    },
    // Event Types
    eventTypes: {
      base: '/EventTypes',
      getAll: '/EventTypes',
      getById: (id: number) => `/EventTypes/${id}`,
      create: '/EventTypes',
      update: (id: number) => `/EventTypes/${id}`,
      delete: (id: number) => `/EventTypes/${id}`
    },
    // Modalities
    modalities: {
      base: '/Modalities',
      getAll: '/Modalities',
      getById: (id: number) => `/Modalities/${id}`,
      create: '/Modalities',
      update: (id: number) => `/Modalities/${id}`,
      delete: (id: number) => `/Modalities/${id}`
    }
  }
} as const;
