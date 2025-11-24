import { Component, input, output, signal, AfterViewInit, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoComplete } from 'primeng/autocomplete';

declare const google: any;

@Component({
    selector: 'app-location-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        AutoComplete,
    ],
    template: `
    <p-dialog [visible]="visible()" (visibleChange)="onVisibleChange.emit($event)" [modal]="true" [style]="{width: '700px'}" [draggable]="false"
      [resizable]="false" styleClass="rounded-2xl">
      <ng-template pTemplate="header">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <i class="pi pi-map-marker text-xl text-blue-600"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ isEditing() ? 'Editar' : 'Nueva' }} Ubicación
            </h3>
            <p class="text-sm text-gray-500">Selecciona la ubicación en el mapa</p>
          </div>
        </div>
      </ng-template>

      @if (locationForm()) {
      <form [formGroup]="locationForm()!" class="space-y-6 pt-4">
        <!-- Mapa Interactivo con Buscador -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Ubicación en el Mapa</label>
          <div class="relative">
            <!-- Buscador sobre el Mapa -->
            <div class="absolute top-3 left-3 right-3 z-10">
              <div class="bg-white rounded-lg shadow-lg">
                <p-autocomplete 
                  [(ngModel)]="searchQuery"
                  [ngModelOptions]="{standalone: true}"
                  [suggestions]="placeSuggestions()"
                  (completeMethod)="searchPlaces($event)"
                  (onSelect)="selectPlace($event)"
                  field="description"
                  placeholder="Buscar lugar, dirección o punto de interés..."
                  inputStyleClass="w-full"
                  class="w-full"
                  [dropdown]="false"
                  [showEmptyMessage]="true"
                  emptyMessage="No se encontraron lugares"
                >
                  <ng-template let-place pTemplate="item">
                    <div class="flex items-center gap-3 p-2">
                      <i class="pi pi-map-marker text-blue-600"></i>
                      <div class="flex-1">
                        <div class="font-medium text-sm text-gray-900">{{ place.structured_formatting?.main_text || place.description }}</div>
                        <div class="text-xs text-gray-500">{{ place.structured_formatting?.secondary_text }}</div>
                      </div>
                    </div>
                  </ng-template>
                </p-autocomplete>
              </div>
            </div>
            <!-- Mapa -->
            <div #mapContainer id="location-map" class="w-full h-96 rounded-xl border border-gray-200"></div>
          </div>
          <p class="text-xs text-gray-500 flex items-center gap-2">
            <i class="pi pi-info-circle"></i>
            Busca un lugar o haz clic en el mapa para seleccionar la ubicación
          </p>
        </div>

        <!-- Nombre de la Ubicación -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Nombre de la Ubicación</label>
          <input pInputText formControlName="name" class="w-full" 
            placeholder="Ej: Centro de Convenciones" />
        </div>

        <!-- Dirección -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Dirección</label>
          <input pInputText formControlName="address" class="w-full" 
            placeholder="Ej: Av. Principal 123, Ciudad" />
        </div>

        <!-- Coordenadas (Solo Lectura) -->
        <!-- <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Latitud</label>
            <input pInputText formControlName="latitude" class="w-full bg-gray-50" readonly />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Longitud</label>
            <input pInputText formControlName="longitude" class="w-full bg-gray-50" readonly />
          </div>
        </div> -->
      </form>
      }

      <ng-template pTemplate="footer">
        <div class="flex justify-end gap-2">
          <p-button label="Cancelar" (onClick)="onCancel.emit()" [outlined]="true" />
          <p-button label="Guardar" (onClick)="onSave.emit()" />
        </div>
      </ng-template>
    </p-dialog>
  `,
})
export class LocationDialogComponent implements AfterViewInit, OnChanges {
    @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLElement>;
    private cdr = inject(ChangeDetectorRef);

    readonly visible = input.required<boolean>();
    readonly isEditing = input<boolean>(false);
    readonly locationForm = input<FormGroup>();

    readonly onSave = output<void>();
    readonly onCancel = output<void>();
    readonly onVisibleChange = output<boolean>();

    private map: any = null;
    private marker: any = null;
    private mapInitialized = signal(false);
    private autocompleteService: any = null;
    private placesService: any = null;

    searchQuery: string = '';
    placeSuggestions = signal<any[]>([]);

    constructor() {
        effect(() => {
            const isVisible = this.visible();
            console.log('Effect triggered - visible:', isVisible);
            console.log('mapContainer:', this.mapContainer);
            console.log('mapInitialized:', this.mapInitialized());

            if (isVisible) {
                setTimeout(() => {
                    if (this.mapContainer?.nativeElement) {
                        console.log('Map container available, initializing...');
                        if (!this.mapInitialized()) {
                            this.initializeMap();
                        } else if (this.map) {
                            console.log('Map already initialized, resizing...');
                            google.maps.event.trigger(this.map, 'resize');
                            const form = this.locationForm();
                            const lat = form?.get('latitude')?.value || 18.4861;
                            const lng = form?.get('longitude')?.value || -69.9312;
                            this.map.setCenter({ lat, lng });
                            if (this.marker) {
                                this.marker.setPosition({ lat, lng });
                            }
                        }
                    } else {
                        console.log('Map container not available yet');
                    }
                }, 500);
            } else {
                console.log('Modal closed, resetting map state');
                this.mapInitialized.set(false);
                this.map = null;
                this.marker = null;
                this.autocompleteService = null;
                this.placesService = null;
            }
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.visible()) {
                this.initializeMap();
            }
        }, 300);
    }

    ngOnChanges() {
        if (this.visible() && !this.mapInitialized() && this.mapContainer) {
            setTimeout(() => this.initializeMap(), 300);
        }
    }

    private async initializeMap() {
        if (this.mapInitialized() || !this.mapContainer?.nativeElement) {
            return;
        }

        try {
            if (typeof google === 'undefined' || !google.maps) {
                await this.waitForGoogleMaps();
            }

            const form = this.locationForm();
            const lat = form?.get('latitude')?.value || 18.4861;
            const lng = form?.get('longitude')?.value || -69.9312;

            const el = this.mapContainer.nativeElement as HTMLElement;
            el.style.width = '100%';
            el.style.height = '384px';

            this.map = new google.maps.Map(el, {
                center: { lat, lng },
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            this.marker = new google.maps.Marker({
                position: { lat, lng },
                map: this.map,
                draggable: true,
            });

            if (this.map) {
                google.maps.event.addListener(this.map, 'click', (e: any) => {
                    this.updateMarkerPosition(e.latLng);
                });
            }

            if (this.marker) {
                google.maps.event.addListener(this.marker, 'dragend', (e: any) => {
                    this.updateMarkerPosition(e.latLng);
                });
            }

            google.maps.event.trigger(this.map, 'resize');
            this.map.setCenter({ lat, lng });

            // Inicializar servicios de Places después de que el mapa esté listo
            setTimeout(async () => {
                try {
                    console.log('Checking google.maps.places:', google.maps.places);

                    // Cargar la biblioteca de Places si no está disponible
                    if (!google.maps.places) {
                        console.log('Loading places library...');
                        await google.maps.importLibrary('places');
                        console.log('Places library loaded');
                    }

                    this.autocompleteService = new google.maps.places.AutocompleteService();
                    this.placesService = new google.maps.places.PlacesService(this.map);
                    console.log('Places services initialized:', {
                        autocomplete: !!this.autocompleteService,
                        places: !!this.placesService
                    });
                } catch (error) {
                    console.error('Error initializing Places services:', error);
                }
            }, 500);

            this.mapInitialized.set(true);
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }

    searchPlaces(event: any) {
        const query = event.query;
        console.log('Searching for:', query);

        if (!query || query.length < 3) {
            this.placeSuggestions.set([]);
            return;
        }

        if (this.autocompleteService) {
            this.autocompleteService.getPlacePredictions(
                {
                    input: query,
                    componentRestrictions: { country: 'DO' },
                },
                (predictions: any, status: any) => {
                    console.log('Autocomplete status:', status);
                    console.log('Predictions:', predictions);

                    if (status === 'OK' && predictions) {
                        this.placeSuggestions.set(predictions);
                        this.cdr.detectChanges();
                        console.log('Suggestions set:', this.placeSuggestions());
                    } else {
                        this.placeSuggestions.set([]);
                        console.log('No predictions found');
                    }
                }
            );
        } else {
            console.log('AutocompleteService not initialized');
        }
    }

    selectPlace(event: any) {
        const placeId = event.value.place_id;

        if (this.placesService && placeId) {
            this.placesService.getDetails(
                {
                    placeId: placeId,
                    fields: ['name', 'formatted_address', 'geometry', 'address_components'],
                },
                (place: any, status: any) => {
                    if (status === 'OK' && place) {
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();

                        const form = this.locationForm();
                        if (form) {
                            setTimeout(() => {
                                form.patchValue({
                                    name: place.name || place.formatted_address.split(',')[0],
                                    address: place.formatted_address,
                                    latitude: lat,
                                    longitude: lng,
                                });
                                this.cdr.detectChanges();
                            });
                        }

                        if (this.map) {
                            this.map.setCenter({ lat, lng });
                            this.map.setZoom(17);
                        }

                        if (this.marker) {
                            this.marker.setPosition({ lat, lng });
                        }

                        this.searchQuery = '';
                    }
                }
            );
        }
    }

    private updateMarkerPosition(latLng: any) {
        const form = this.locationForm();
        if (form) {
            const lat = latLng.lat();
            const lng = latLng.lng();

            setTimeout(() => {
                form.patchValue({
                    latitude: lat,
                    longitude: lng,
                });

                this.getAddressFromCoordinates(lat, lng);
                this.cdr.detectChanges();
            });
        }
        if (this.marker) {
            google.maps.event.clearListeners(this.marker, 'dragend');
            this.marker.setPosition(latLng);
            google.maps.event.addListener(this.marker, 'dragend', (e: any) => {
                this.updateMarkerPosition(e.latLng);
            });
        }
    }

    private getAddressFromCoordinates(lat: number, lng: number) {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results: any, status: any) => {
            console.log('Geocode status:', status);
            console.log('Geocode results:', results);

            if (status === 'OK' && results && results[0]) {
                const form = this.locationForm();

                if (form) {
                    const addressComponents = results[0].address_components;
                    const placeName = this.extractPlaceName(addressComponents);

                    console.log('Place name extracted:', placeName);
                    console.log('Formatted address:', results[0].formatted_address);

                    setTimeout(() => {
                        form.patchValue({
                            address: results[0].formatted_address,
                            name: placeName || results[0].formatted_address.split(',')[0],
                        });
                        this.cdr.detectChanges();
                        console.log('Form after geocoding:', form.value);
                    });
                }
            } else {
                console.error('Geocoding failed:', status);
            }
        });
    }

    private extractPlaceName(components: any[]): string {
        const poi = components.find((c: any) => c.types.includes('point_of_interest'));
        if (poi) return poi.long_name;

        const premise = components.find((c: any) => c.types.includes('premise'));
        if (premise) return premise.long_name;

        const route = components.find((c: any) => c.types.includes('route'));
        if (route) return route.long_name;

        return '';
    }

    private waitForGoogleMaps(): Promise<void> {
        return new Promise((resolve) => {
            const checkGoogleMaps = () => {
                if (typeof google !== 'undefined' && google.maps) {
                    resolve();
                } else {
                    setTimeout(checkGoogleMaps, 100);
                }
            };
            checkGoogleMaps();
        });
    }
}

