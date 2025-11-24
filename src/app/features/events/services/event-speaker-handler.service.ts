import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Speaker } from '@core/models';
import { SpeakerService } from '../../speakers/services/speaker.service';
import { EventFormBuilderService } from './event-form-builder.service';

/**
 * Servicio para manejar operaciones CRUD de speakers en eventos
 */
@Injectable()
export class EventSpeakerHandlerService {
    private speakerService = inject(SpeakerService);
    private messageService = inject(MessageService);
    private formBuilder = inject(EventFormBuilderService);

    /**
     * Crea un nuevo speaker y lo agrega al evento
     */
    createSpeaker(
        speakerData: any,
        eventDateIndex: number,
        form: FormGroup,
        onSuccess?: (speaker: Speaker) => void
    ): void {
        const createRequest = this.buildSpeakerRequest(speakerData);

        this.speakerService.create(createRequest).subscribe({
            next: (response) => {
                if (response.data) {
                    this.formBuilder.addSpeakerToEventDate(
                        form,
                        eventDateIndex,
                        response.data
                    );

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Speaker Creado',
                        detail: `${response.data.name} ${response.data.lastName} ha sido creado exitosamente.`,
                        life: 3000,
                    });

                    if (onSuccess) {
                        onSuccess(response.data);
                    }
                }
            },
            error: (error) => {
                this.handleSpeakerError(error, 'crear');
            },
        });
    }

    /**
     * Actualiza un speaker existente
     */
    updateSpeaker(
        speaker: Speaker,
        eventDateIndex: number,
        speakerIndex: number,
        form: FormGroup,
        onSuccess?: (speaker: Speaker) => void
    ): void {
        const updateRequest = this.buildSpeakerRequest(speaker, speaker.id);

        this.speakerService.update(updateRequest).subscribe({
            next: (response) => {
                if (response.data) {
                    // Actualizar el formulario con los datos actualizados
                    this.formBuilder.updateSpeakerInForm(
                        form,
                        eventDateIndex,
                        speakerIndex,
                        response.data
                    );

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Speaker Actualizado',
                        detail: `${response.data.name} ${response.data.lastName} ha sido actualizado exitosamente.`,
                        life: 3000,
                    });

                    if (onSuccess) {
                        onSuccess(response.data);
                    }
                }
            },
            error: (error) => {
                this.handleSpeakerError(error, 'actualizar');
            },
        });
    }

    /**
     * Agrega un speaker existente al evento
     */
    addExistingSpeaker(
        speaker: Speaker,
        eventDateIndex: number,
        form: FormGroup
    ): void {
        this.formBuilder.addSpeakerToEventDate(form, eventDateIndex, speaker);

        this.messageService.add({
            severity: 'success',
            summary: 'Speaker Agregado',
            detail: `${speaker.name} ${speaker.lastName} ha sido agregado al evento.`,
            life: 3000,
        });
    }

    /**
     * Construye el objeto de request para crear/actualizar speaker
     */
    private buildSpeakerRequest(speakerData: any, id?: number): any {
        const request: any = {
            name: speakerData.name || '',
            lastName: speakerData.lastName || '',
            birthDay: speakerData.birthDay || '2000-01-01',
            gendersId: speakerData.gendersId || 1,
            countriesId: speakerData.countriesId || 1,
            email: speakerData.email || '',
            phoneNumber: speakerData.phoneNumber || '',
            commentary: speakerData.commentary || '',
            academicDegreesId: speakerData.academicDegreesId || 1,
            academicLevelsId: speakerData.academicLevelsId || 1,
            areaOfStudyId: speakerData.areaOfStudyId || 1,
            educationalInstitutionId: speakerData.educationalInstitutionId || null,
            linkedInUrl: speakerData.linkedInUrl || '',
            twitterUrl: speakerData.twitterUrl || '',
            websiteUrl: speakerData.websiteUrl || '',
        };

        if (id) {
            request.id = id;
        }

        return request;
    }

    /**
     * Maneja errores en operaciones de speaker
     */
    private handleSpeakerError(error: any, operation: 'crear' | 'actualizar'): void {
        let errorMessage = `No se pudo ${operation} el speaker. Intenta nuevamente.`;
        let errorSummary = `Error al ${operation} speaker`;

        // Manejar error 409 - Conflict
        if (error?.status === 409) {
            if (operation === 'crear') {
                errorSummary = 'Speaker Ya Existe';
                errorMessage =
                    'Ya existe un speaker registrado con este email. Por favor, usa la opción "Seleccionar Existente" para agregarlo al evento.';
            } else {
                errorSummary = 'Conflicto al Actualizar';
                errorMessage =
                    'El email ingresado ya está registrado con otro speaker.';
            }
        } else if (error?.error?.message) {
            errorMessage = error.error.message;
        } else if (error?.message) {
            errorMessage = error.message;
        }

        this.messageService.add({
            severity: operation === 'crear' ? 'warn' : 'error',
            summary: errorSummary,
            detail: errorMessage,
            life: operation === 'crear' ? 7000 : 5000,
        });
    }
}

