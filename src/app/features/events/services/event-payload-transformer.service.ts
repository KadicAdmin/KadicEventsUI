import { Injectable } from '@angular/core';
import {
    CreateEventRequest,
    CreateEventDateRequest,
    CreateEventDateTalkRequest,
    CreateEventAddressRequest,
    CreateEventModalityRequest,
    CreateEventTag,
    EventImage
} from '@core/models';
import { ImageUtil } from '@core/utils';

/**
 * Servicio para transformar datos del formulario al formato requerido por el API
 */
@Injectable()
export class EventPayloadTransformerService {
    /**
     * Procesa las imágenes principales del evento
     */
    async processMainImages(images: any[]): Promise<EventImage[]> {
        if (!images || !Array.isArray(images)) {
            return [];
        }

        const imagesArray = Array.isArray(images[0]) ? images[0] : images;
        const processedImages: EventImage[] = [];

        for (const img of imagesArray) {
            let base64Image = '';

            if (img.file) {
                base64Image = await ImageUtil.fileToBase64(img.file);
            } else if (img.imageUrl) {
                base64Image = ImageUtil.extractBase64(img.imageUrl);
            }

            if (base64Image) {
                processedImages.push({
                    eventId: img.eventId || 0,
                    imageUrl: base64Image,
                    caption: img.caption || 'Imagen del evento',
                    isMain: img.isMain || false,
                    createAt: new Date().toISOString(),
                });
            }
        }

        return processedImages;
    }

    /**
     * Procesa una imagen individual y retorna el base64
     */
    async processImage(image: any): Promise<string> {
        if (!image) {
            return '';
        }

        // Si es un archivo File directamente
        if (image instanceof File) {
            return await ImageUtil.fileToBase64(image);
        }

        // Si tiene propiedad file
        if (image.file) {
            return await ImageUtil.fileToBase64(image.file);
        }

        // Si tiene url o imageUrl (ya es base64 o URL)
        if (image.url) {
            return ImageUtil.extractBase64(image.url);
        }

        if (image.imageUrl) {
            return ImageUtil.extractBase64(image.imageUrl);
        }

        // Si es string directamente
        if (typeof image === 'string') {
            return ImageUtil.extractBase64(image);
        }

        return '';
    }

    /**
     * Procesa los tags del evento
     */
    processTags(tagIds: number[]): CreateEventTag[] {
        return (tagIds || []).map((id) => ({ tagId: id }));
    }

    /**
     * Procesa las modalidades de una fecha de evento
     */
    processModalities(modalityIds: number[]): CreateEventModalityRequest[] {
        return (modalityIds || []).map((modalityId) => ({ modalityId }));
    }

    /**
     * Procesa la dirección/ubicación de un evento
     */
    processEventAddress(location: any): CreateEventAddressRequest | null {
        if (!location || (!location.name && !location.address)) {
            return null;
        }

        return {
            name: location.name || 'Ubicación del evento',
            address: location.address || '',
            latitude: location.latitude || 0,
            longitude: location.longitude || 0,
        };
    }

    /**
     * Convierte hora de formato HH:MM a HH:MM:SS
     */
    formatTimeToHHMMSS(time: string): string {
        if (!time) {
            return '00:00:00';
        }

        if (time.includes(':') && time.split(':').length === 2) {
            return `${time}:00`;
        }

        return time;
    }

    /**
     * Procesa las charlas de una fecha de evento
     */
    async processEventDateTalks(talks: any[]): Promise<CreateEventDateTalkRequest[]> {
        if (!talks || !Array.isArray(talks)) {
            return [];
        }

        const processedTalks: CreateEventDateTalkRequest[] = [];

        for (const talk of talks) {
            // Procesar imagen de la charla
            const talkImageBase64 = await this.processImage(talk.imageUrl);

            // Procesar speakers de la charla
            const speakerTalkPayload = (talk.speakers || []).map(
                (speakerId: number) => ({ speakerId })
            );

            // Convertir horas
            const startHourFormatted = this.formatTimeToHHMMSS(talk.startHour);
            const endHourFormatted = this.formatTimeToHHMMSS(talk.endHour);

            processedTalks.push({
                startHour: startHourFormatted,
                endHour: endHourFormatted,
                title: talk.title || '',
                description: talk.description || '',
                duration: talk.duration || 0,
                imageUrl: talkImageBase64,
                speakerTalk: speakerTalkPayload,
            });
        }

        return processedTalks;
    }

    /**
     * Procesa las fechas de evento completas
     */
    async processEventDates(eventDates: any[]): Promise<CreateEventDateRequest[]> {
        if (!eventDates || !Array.isArray(eventDates)) {
            return [];
        }

        const processedEventDates: CreateEventDateRequest[] = [];

        for (const eventDateForm of eventDates) {
            // Procesar imagen principal del eventDate
            const mainImageBase64 = await this.processImage(eventDateForm.mainImage);

            // Procesar modalidades
            const modalitiesPayload = this.processModalities(eventDateForm.modalities);

            // Procesar ubicación/dirección
            const eventAddress = this.processEventAddress(eventDateForm.location);

            // Procesar charlas
            const eventDateTalkPayload = await this.processEventDateTalks(
                eventDateForm.talks
            );

            // Construir el eventDate completo con tipo correcto
            const eventDatePayload: CreateEventDateRequest = {
                date: eventDateForm.date
                    ? new Date(eventDateForm.date).toISOString()
                    : new Date().toISOString(),
                title: eventDateForm.title || '',
                description: eventDateForm.description || '',
                mainImage: mainImageBase64,
                virtualLink: eventDateForm.virtualLink || null,
                eventDatesModalities: modalitiesPayload,
                eventAddress: eventAddress,
                eventDateTalk: eventDateTalkPayload,
            };

            processedEventDates.push(eventDatePayload);
        }

        return processedEventDates;
    }

    /**
     * Construye el payload completo del evento
     */
    async buildEventPayload(formValue: any): Promise<CreateEventRequest> {
        // Procesar imágenes del evento principal
        const processedImages = await this.processMainImages(formValue.images);

        // Procesar tags
        const tagsPayload = this.processTags(formValue.tags);

        // Procesar eventDates
        const eventDatesPayload = await this.processEventDates(formValue.eventDates);

        // Construir el request final con tipo correcto
        const payload: CreateEventRequest = {
            name: formValue.name || '',
            description: formValue.description || '',
            eventCategoryID: formValue.categoryId || 0,
            eventTypeId: formValue.eventTypeId || 0,
            maxParticipants: formValue.maxParticipants || 0,
            images: processedImages,
            tags: tagsPayload,
            eventDates: eventDatesPayload,
        };

        return payload;
    }
}
