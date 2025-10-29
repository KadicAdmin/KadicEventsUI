import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Speaker } from '@core/models';

/**
 * Servicio para construcción y gestión de formularios de eventos
 */
@Injectable()
export class EventFormBuilderService {
    private fb = inject(FormBuilder);

    /**
     * Crea el formulario principal de evento
     */
    createEventForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            description: [''],
            categoryId: [null, Validators.required],
            tags: [[]],
            maxParticipants: [null],
            eventTypeId: [null, Validators.required],
            mainImage: [null],
            images: [[]],
            eventDates: this.fb.array([]),
        });
    }

    /**
     * Crea un FormGroup para una fecha de evento
     */
    createEventDateGroup(): FormGroup {
        return this.fb.group({
            date: [null, Validators.required],
            title: ['', Validators.required],
            description: [''],
            mainImage: [null],
            virtualLink: [''],
            modalities: [[]],
            location: this.createLocationGroup(),
            speakers: this.fb.array([]),
            talks: this.fb.array([]),
            schedules: this.fb.array([]),
        });
    }

    /**
     * Crea un FormGroup para ubicación
     */
    createLocationGroup(): FormGroup {
        return this.fb.group({
            name: [null],
            address: [null],
            latitude: [null],
            longitude: [null],
        });
    }

    /**
     * Crea un FormGroup para speaker
     */
    createSpeakerGroup(speaker?: Speaker): FormGroup {
        if (speaker) {
            return this.fb.group({
                speakerId: [speaker.id],
                name: [speaker.name],
                lastName: [speaker.lastName],
                email: [speaker.email],
            });
        }

        return this.fb.group({
            speakerId: [null, Validators.required],
            name: [''],
            lastName: [''],
            email: [''],
        });
    }

    /**
     * Crea un FormGroup para charla (talk)
     */
    createTalkGroup(): FormGroup {
        return this.fb.group({
            title: ['', Validators.required],
            description: [''],
            duration: [null],
            startHour: [''],
            endHour: [''],
            imageUrl: [null],
            speakers: [[]],
        });
    }

    /**
     * Añade una fecha de evento al FormArray
     */
    addEventDate(form: FormGroup): void {
        const eventDates = this.getEventDatesArray(form);
        eventDates.push(this.createEventDateGroup());
    }

    /**
     * Elimina una fecha de evento del FormArray
     */
    removeEventDate(form: FormGroup, index: number): void {
        const eventDates = this.getEventDatesArray(form);
        eventDates.removeAt(index);
    }

    /**
     * Añade un speaker vacío a una fecha de evento
     */
    addSpeakerToEventDate(form: FormGroup, eventDateIndex: number, speaker?: Speaker): void {
        const speakers = this.getSpeakersArray(form, eventDateIndex);
        speakers.push(this.createSpeakerGroup(speaker));
    }

    /**
     * Elimina un speaker de una fecha de evento
     */
    removeSpeakerFromEventDate(
        form: FormGroup,
        eventDateIndex: number,
        speakerIndex: number
    ): void {
        const speakers = this.getSpeakersArray(form, eventDateIndex);
        speakers.removeAt(speakerIndex);
    }

    /**
     * Añade una charla a una fecha de evento
     */
    addTalkToEventDate(form: FormGroup, eventDateIndex: number): void {
        const talks = this.getTalksArray(form, eventDateIndex);
        talks.push(this.createTalkGroup());
    }

    /**
     * Elimina una charla de una fecha de evento
     */
    removeTalkFromEventDate(
        form: FormGroup,
        eventDateIndex: number,
        talkIndex: number
    ): void {
        const talks = this.getTalksArray(form, eventDateIndex);
        talks.removeAt(talkIndex);
    }

    /**
     * Limpia la ubicación de una fecha de evento
     */
    clearLocation(form: FormGroup, eventDateIndex: number): void {
        const location = this.getLocationGroup(form, eventDateIndex);
        location?.reset();
    }

    // ========== Getters de FormArrays y FormGroups ==========

    /**
     * Obtiene el FormArray de eventDates
     */
    getEventDatesArray(form: FormGroup): FormArray {
        return form.get('eventDates') as FormArray;
    }

    /**
     * Obtiene los controles del FormArray de eventDates
     */
    getEventDatesControls(form: FormGroup): any[] {
        return this.getEventDatesArray(form).controls;
    }

    /**
     * Obtiene el FormArray de speakers de una fecha específica
     */
    getSpeakersArray(form: FormGroup, eventDateIndex: number): FormArray {
        const eventDates = this.getEventDatesArray(form);
        const eventDate = eventDates.at(eventDateIndex) as FormGroup;
        return eventDate.get('speakers') as FormArray;
    }

    /**
     * Obtiene los controles del FormArray de speakers
     */
    getSpeakersControls(form: FormGroup, eventDateIndex: number): any[] {
        return this.getSpeakersArray(form, eventDateIndex)?.controls || [];
    }

    /**
     * Obtiene el FormArray de talks de una fecha específica
     */
    getTalksArray(form: FormGroup, eventDateIndex: number): FormArray {
        const eventDates = this.getEventDatesArray(form);
        const eventDate = eventDates.at(eventDateIndex) as FormGroup;
        return eventDate.get('talks') as FormArray;
    }

    /**
     * Obtiene los controles del FormArray de talks
     */
    getTalksControls(form: FormGroup, eventDateIndex: number): any[] {
        return this.getTalksArray(form, eventDateIndex)?.controls || [];
    }

    /**
     * Obtiene el FormGroup de location de una fecha específica
     */
    getLocationGroup(form: FormGroup, eventDateIndex: number): FormGroup | null {
        const eventDates = this.getEventDatesArray(form);
        const eventDate = eventDates.at(eventDateIndex) as FormGroup;
        return eventDate.get('location') as FormGroup;
    }

    /**
     * Actualiza un speaker en el formulario
     */
    updateSpeakerInForm(
        form: FormGroup,
        eventDateIndex: number,
        speakerIndex: number,
        speaker: Speaker
    ): void {
        const speakers = this.getSpeakersArray(form, eventDateIndex);
        const speakerForm = speakers.at(speakerIndex) as FormGroup;

        speakerForm.patchValue({
            speakerId: speaker.id,
            name: speaker.name,
            lastName: speaker.lastName,
            email: speaker.email,
        });
    }
}

