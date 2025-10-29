/**
 * Utilidades para el manejo de imágenes
 */

import { EventImage } from '@core/models';

export class ImageUtil {
  /**
   * Convierte una imagen a base64 puro (sin prefijo data:image/...)
   * @param imageUrl - URL de la imagen que puede incluir prefijo data:image/...
   * @returns string base64 puro
   */
  static extractBase64(imageUrl: string): string {
    if (!imageUrl) return '';

    // Si contiene el prefijo data:image/..., extraer solo la parte base64
    if (imageUrl.includes(',')) {
      return imageUrl.split(',')[1];
    }

    // Si ya es base64 puro, devolverlo tal como está
    return imageUrl;
  }

  /**
   * Convierte un archivo a base64
   * @param file - Archivo a convertir
   * @returns Promise<string> - Base64 string
   */
  static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(this.extractBase64(result));
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Valida si una cadena es base64 válida
   * @param str - Cadena a validar
   * @returns boolean
   */
  static isValidBase64(str: string): boolean {
    if (!str) return false;

    try {
      // Verificar que no contenga caracteres no base64
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      return base64Regex.test(str);
    } catch {
      return false;
    }
  }

  /**
   * Procesa un array de imágenes y extrae el base64 puro
   * @param images - Array de objetos con imagen
   * @returns Array procesado con base64 puro
   */
  static processImagesArray(images: {
    imageUrl: string;
    caption: string;
    eventId: number;
    isMain: boolean;
    createdAt: string;
  ): EventImage[] {
    if (!Array.isArray(images)) return [];

    return images
      .filter((img) => img && (img.imageUrl || img.url))
      .map((img) => {
        const imageUrl = img.imageUrl || img.url;
        const base64Data = this.extractBase64(imageUrl);

        return {
          eventId: img.eventId || 0,
          imageUrl: base64Data,
          caption: img.caption || '',
          isMain: img.isMain || false,
          createdAt: img.createdAt || new Date().toISOString(),
        };
      });
  }

  /**
   * Obtiene el tipo MIME de una imagen desde su data URL
   * @param dataUrl - Data URL de la imagen
   * @returns string - Tipo MIME (ej: 'image/png', 'image/jpeg')
   */
  static getMimeType(dataUrl: string): string {
    if (!dataUrl || !dataUrl.includes(',')) return '';

    const mimeMatch = dataUrl.match(/data:([^;]+);/);
    return mimeMatch ? mimeMatch[1] : '';
  }

  /**
   * Calcula el tamaño aproximado de una imagen en base64
   * @param base64String - String base64
   * @returns number - Tamaño en bytes
   */
  static getBase64Size(base64String: string): number {
    if (!base64String) return 0;

    // Base64 agrega ~33% de overhead, así que dividimos por 1.33
    return Math.round((base64String.length * 3) / 4);
  }
}
