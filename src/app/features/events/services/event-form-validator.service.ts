import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

/**
 * Servicio para validación de formularios de eventos
 */
@Injectable()
export class EventFormValidatorService {
    /**
     * Configura validación en tiempo real para campos específicos
     */
    setupRealtimeValidation(form: FormGroup): void {
        const fieldsToValidate = ['name', 'eventTypeId', 'categoryId'];

        fieldsToValidate.forEach((fieldName) => {
            const control = form.get(fieldName);
            if (control) {
                control.valueChanges.subscribe(() => {
                    if (control.dirty && !control.touched) {
                        control.markAsTouched();
                    }
                });
            }
        });
    }

    /**
     * Obtiene todos los errores del formulario
     */
    getFormErrors(form: FormGroup): any {
        const formErrors: any = {};

        Object.keys(form.controls).forEach((key) => {
            const controlErrors = form.get(key)?.errors;
            if (controlErrors) {
                formErrors[key] = controlErrors;
            }
        });

        return formErrors;
    }

    /**
     * Verifica si un campo específico es inválido
     */
    isFieldInvalid(form: FormGroup, fieldName: string): boolean {
        const field = form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    /**
     * Obtiene el mensaje de error para un campo específico
     */
    getFieldErrorMessage(form: FormGroup, fieldName: string): string {
        const field = form.get(fieldName);
        if (!field || !field.errors || (!field.dirty && !field.touched)) {
            return '';
        }

        const errors = field.errors;

        if (errors['required']) {
            return this.getRequiredMessage(fieldName);
        }

        if (errors['email']) {
            return 'Por favor ingresa un email válido';
        }

        if (errors['minlength']) {
            return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        }

        if (errors['maxlength']) {
            return `No puede exceder ${errors['maxlength'].requiredLength} caracteres`;
        }

        if (errors['pattern']) {
            return 'El formato no es válido';
        }

        return 'Este campo tiene un error';
    }

    /**
     * Obtiene el mensaje de error específico para campos requeridos
     */
    private getRequiredMessage(fieldName: string): string {
        const messages: { [key: string]: string } = {
            name: 'El nombre del evento es requerido',
            eventTypeId: 'Selecciona un tipo de evento',
            categoryId: 'Selecciona una categoría',
            date: 'La fecha es requerida',
            title: 'El título de la fecha es requerido',
            speakerId: 'El ID del speaker es requerido',
            talkId: 'El ID del talk es requerido',
        };

        return messages[fieldName] || 'Este campo es requerido';
    }

    /**
     * Obtiene errores a nivel de formulario (no de campos individuales)
     */
    getFormLevelErrors(form: FormGroup): string[] {
        const errors: string[] = [];

        // Validar que haya al menos una fecha de evento
        const eventDates = form.get('eventDates') as FormArray;
        if (eventDates && eventDates.length === 0) {
            // Descomentado si se requiere esta validación
            // errors.push('Debes agregar al menos una fecha para el evento');
        }

        // Validar errores personalizados del formulario
        if (form.errors?.['dateRange']) {
            const dateRangeError = form.errors['dateRange'];
            if (dateRangeError.message) {
                errors.push(dateRangeError.message);
            } else {
                errors.push('Las fechas del evento no son válidas');
            }
        }

        return errors;
    }

    /**
     * Verifica si hay errores a nivel de formulario
     */
    hasFormLevelErrors(form: FormGroup): boolean {
        return this.getFormLevelErrors(form).length > 0;
    }

    /**
     * Genera mensaje de error apropiado basado en el número de errores
     */
    getValidationErrorMessage(form: FormGroup): string {
        const fieldErrors = this.getFormErrors(form);
        const errorCount = Object.keys(fieldErrors).length;
        const formLevelErrorsCount = this.getFormLevelErrors(form).length;
        const totalErrors = errorCount + formLevelErrorsCount;

        if (totalErrors === 0) {
            return 'Por favor corrige los errores en el formulario.';
        }

        if (totalErrors === 1) {
            return 'Por favor corrige el error en el formulario.';
        }

        return `Por favor corrige los ${totalErrors} errores en el formulario.`;
    }

    /**
     * Registra todos los errores del formulario en consola (útil para debugging)
     */
    logAllFormErrors(form: FormGroup): void {
        const formLevelErrors = this.getFormLevelErrors(form);
        const fieldErrors = this.getFormErrors(form);
        const totalFieldErrors = Object.keys(fieldErrors).length;
        const totalFormErrors = formLevelErrors.length;
        const totalErrors = totalFieldErrors + totalFormErrors;

        console.group('📋 Errores del Formulario');
        console.log('Total de errores:', totalErrors);
        console.log('Errores de campos:', fieldErrors);
        console.log('Errores a nivel de formulario:', formLevelErrors);
        console.groupEnd();
    }
}

