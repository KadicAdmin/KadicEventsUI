/**
 * Barrel export para servicios de eventos
 */

// Servicios principales
export { EventService } from './event.service';
export { EventModalityService } from './event.modality.service';
export { EventTypeService } from './event.type.service';
export { EventCategoryService } from './event.category.service';
export { EventTagsService } from './event-tags.service';
export { SpeakerService } from './speaker.service';

// Servicios especializados para gestión de eventos
export { EventStateService } from './event-state.service';
export { EventFormBuilderService } from './event-form-builder.service';
export { EventFormValidatorService } from './event-form-validator.service';
export { EventPayloadTransformerService } from './event-payload-transformer.service';
export { EventSpeakerHandlerService } from './event-speaker-handler.service';

