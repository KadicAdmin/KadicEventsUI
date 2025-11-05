import { inject, Injectable, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventModalityService } from './event.modality.service';
import { EventTypeService } from './event.type.service';
import { EventTagsService } from './event-tags.service';
import { EventCategoryService } from './event.category.service';
import { SpeakerService } from '../../speakers/services/speaker.service';
import { extractData } from '@core/utils/api-response.utils';
import {
  EventModality,
  EventType,
  EventTags,
  EventCategory,
  Speaker,
  AcademicDegree,
  AcademicLevel,
} from '@core/models';
import { AcademicDegreeService } from '../../../core/services/academic-degree.service';
import { AcademicLevelService } from 'app/features/admin';

@Injectable()
export class EventStateService {
  private modalityService = inject(EventModalityService);
  private eventTypeService = inject(EventTypeService);
  private tagsService = inject(EventTagsService);
  private categoryService = inject(EventCategoryService);
  private speakerService = inject(SpeakerService);
  private academicDegreeService = inject(AcademicDegreeService);
  private academicLevelService = inject(AcademicLevelService);

  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly modalities = toSignal(
    this.modalityService.getAll().pipe(extractData()),
    { initialValue: [] as EventModality[] }
  );

  readonly eventTypes = toSignal(
    this.eventTypeService.getAll().pipe(extractData()),
    { initialValue: [] as EventType[] }
  );

  readonly tags = toSignal(this.tagsService.getAll().pipe(extractData()), {
    initialValue: [] as EventTags[],
  });

  readonly categories = toSignal(
    this.categoryService.getAll().pipe(extractData()),
    { initialValue: [] as EventCategory[] }
  );

  readonly speakers = toSignal(
    this.speakerService.getAll().pipe(extractData()),
    { initialValue: [] as Speaker[] }
  );

  readonly academicDegrees = toSignal(
    this.academicDegreeService.getAll().pipe(extractData()),
    { initialValue: [] as AcademicDegree[] }
  );

  //   readonly academicLevels = signal<{ name: string; id: number }[]>([
  //     { name: 'Doctorado', id: 1 },
  //     { name: 'Maestría', id: 2 },
  //     { name: 'Licenciatura', id: 3 },
  //     { name: 'Técnico Superior', id: 4 },
  //     { name: 'Técnico', id: 5 },
  //   ]);

  readonly academicLevels = toSignal(
    this.academicLevelService.getAll().pipe(extractData()),
    { initialValue: [] as AcademicLevel[] }
  );

  readonly studyAreas = signal<{ name: string; id: number }[]>([
    { name: 'Ingeniería de Software', id: 1 },
    { name: 'Ciencias de la Computación', id: 2 },
    { name: 'Sistemas de Información', id: 3 },
    { name: 'Inteligencia Artificial', id: 4 },
    { name: 'Ciberseguridad', id: 5 },
    { name: 'Redes y Telecomunicaciones', id: 6 },
  ]);

  readonly educationalInstitutions = signal<{ name: string; id: number }[]>([
    { name: 'Universidad Autónoma de Santo Domingo (UASD)', id: 1 },
    { name: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)', id: 2 },
    { name: 'Instituto Tecnológico de Santo Domingo (INTEC)', id: 3 },
    { name: 'Universidad Iberoamericana (UNIBE)', id: 4 },
    { name: 'Universidad APEC (UNAPEC)', id: 5 },
  ]);

  // Computed signals útiles
  readonly hasModalitiesLoaded = computed(
    () => this.modalities()?.length ?? 0 > 0
  );
  readonly hasEventTypesLoaded = computed(
    () => this.eventTypes()?.length ?? 0 > 0
  );
  readonly hasCategoriesLoaded = computed(
    () => this.categories()?.length ?? 0 > 0
  );
  readonly hasSpeakersLoaded = computed(() => this.speakers()?.length ?? 0 > 0);

  readonly allDataLoaded = computed(
    () =>
      this.hasModalitiesLoaded() &&
      this.hasEventTypesLoaded() &&
      this.hasCategoriesLoaded()
  );

  /**
   * Refresca la lista de speakers
   */
  refreshSpeakers(): void {
    // Los speakers se actualizan automáticamente gracias a toSignal
    // Este método existe para mantener consistencia en la API
    this.isLoading.set(true);
    // El observable se refresca automáticamente
    setTimeout(() => this.isLoading.set(false), 100);
  }

  /**
   * Limpia los errores
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Establece un error
   */
  setError(errorMessage: string): void {
    this.error.set(errorMessage);
  }
}
