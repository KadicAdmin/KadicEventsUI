import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse } from '../models/common.models';

/**
 * Operador RxJS para extraer automáticamente la propiedad `data` de un ApiResponse
 * 
 * @example
 * this.http.get<ApiResponse<Event[]>>('/api/events')
 *   .pipe(extractData())
 *   .subscribe(events => console.log(events)); // Event[] directamente
 */
export function extractData<T>() {
    return pipe(
        map((response: ApiResponse<T>) => {
            console.log('🔍 extractData - Respuesta completa:', response);
            console.log('📦 extractData - Data extraída:', response?.data);
            return response?.data;
        })
    );
}

/**
 * Operador RxJS para extraer data y manejar respuestas paginadas
 * 
 * @example
 * this.http.get<ApiResponse<PaginatedResponse<Event>>>('/api/events')
 *   .pipe(extractPaginatedData())
 *   .subscribe(result => console.log(result)); // PaginatedResponse<Event>
 */
export function extractPaginatedData<T>() {
    return pipe(
        map((response: ApiResponse<PaginatedResponse<T>>) => response.data)
    );
}

/**
 * Operador RxJS para extraer solo el array de datos de una respuesta paginada
 * 
 * @example
 * this.http.get<ApiResponse<PaginatedResponse<Event>>>('/api/events')
 *   .pipe(extractPaginatedItems())
 *   .subscribe(events => console.log(events)); // Event[]
 */
export function extractPaginatedItems<T>() {
    return pipe(
        map((response: ApiResponse<PaginatedResponse<T>>) => response.data.data)
    );
}

/**
 * Verifica si una respuesta de API fue exitosa
 * 
 * @param response - La respuesta de la API
 * @returns true si la respuesta fue exitosa
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): boolean {
    return response.success === true;
}

/**
 * Extrae mensajes de error de una respuesta de API
 * 
 * @param response - La respuesta de la API
 * @returns Array de mensajes de error o un array vacío
 */
export function extractErrors<T>(response: ApiResponse<T>): string[] {
    return response.errors || [];
}

/**
 * Operador RxJS para transformar respuestas y capturar errores
 * 
 * @param onError - Callback opcional para manejar errores
 * @example
 * this.http.get<ApiResponse<Event[]>>('/api/events')
 *   .pipe(
 *     handleApiResponse((errors) => console.error(errors))
 *   )
 *   .subscribe(events => console.log(events));
 */
export function handleApiResponse<T>(onError?: (errors: string[]) => void) {
    return pipe(
        map((response: ApiResponse<T>) => {
            if (!isSuccessResponse(response) && onError) {
                onError(extractErrors(response));
            }
            return response.data;
        })
    );
}

/**
 * Operador para extraer data de forma segura, incluso si la API no retorna ApiResponse
 * Intenta extraer .data si existe, sino retorna el valor tal cual
 * 
 * @example
 * // Si la API retorna: { data: [...] } → extrae el array
 * // Si la API retorna: [...] directamente → retorna el array
 * this.http.get('/api/events')
 *   .pipe(extractDataSafe())
 *   .subscribe(events => console.log(events));
 */
export function extractDataSafe<T>() {
    return pipe(
        map((response: any) => {
            console.log('🔍 extractDataSafe - Respuesta:', response);

            // Si es un ApiResponse con data, extraer data
            if (response && typeof response === 'object' && 'data' in response) {
                console.log('📦 extractDataSafe - Extrayendo .data:', response.data);
                return response.data as T;
            }

            // Si no, asumir que ya es el dato directo
            console.log('📦 extractDataSafe - Retornando response directa:', response);
            return response as T;
        })
    );
}

