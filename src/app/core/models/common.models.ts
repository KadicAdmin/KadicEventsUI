// Common interfaces
export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ApiResponse<T = unknown> {
  data: T;
  success?: boolean;
  message?: string;
  errors?: string[];
  metadata?: Record<string, unknown>;
  totalRecords?: number;
}

/**
 * Tipo helper para extraer el tipo de data de un ApiResponse
 * 
 * @example
 * type EventData = UnwrapApiResponse<ApiResponse<Event>>; // Event
 */
export type UnwrapApiResponse<T> = T extends ApiResponse<infer U> ? U : never;

/**
 * Respuesta de lista simple (sin paginación completa)
 */
export interface ApiListResponse<T> {
  data: T[];
  totalRecords: number;
}

/**
 * Respuesta paginada de la API
 * Usado para endpoints que retornan listas con paginación
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Parámetros para búsqueda y filtrado
 */
export interface SearchParams {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}
