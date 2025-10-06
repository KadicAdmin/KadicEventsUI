import { Injectable, signal } from '@angular/core';

export interface MapOptions {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
    mapTypeId?: google.maps.MapTypeId;
    styles?: google.maps.MapTypeStyle[];
}

export interface MarkerOptions {
    position: {
        lat: number;
        lng: number;
    };
    title?: string;
    animation?: google.maps.Animation;
}

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsService {
    private isLoaded = signal<boolean>(false);
    private isLoading = signal<boolean>(false);
    private error = signal<string>('');
    private apiKey = 'AIzaSyCgHSZdEiQ6g9ueR4Mt1eG2lrTy9GcG29I'; // Replace with your actual API key

    constructor() { }

    async loadMaps(): Promise<void> {
        if (this.isLoaded()) {
            return;
        }

        if (this.isLoading()) {
            return;
        }

        this.isLoading.set(true);
        this.error.set('');

        try {
            await this.loadGoogleMapsAPI();
            this.isLoaded.set(true);
        } catch (error) {
            console.error('Error loading Google Maps:', error);
            this.error.set('Error al cargar Google Maps');
            throw error;
        } finally {
            this.isLoading.set(false);
        }
    }

    private async loadGoogleMapsAPI(): Promise<void> {
        return new Promise((resolve, reject) => {
            // If already present and usable
            if ((window as any).google?.maps) {
                resolve();
                return;
            }

            // If script already exists, wait for it to finish loading
            const existing = Array.from(document.getElementsByTagName('script'))
                .find(s => s.src.includes('maps.googleapis.com/maps/api/js')) as HTMLScriptElement | undefined;

            if (existing) {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps API')));
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
            script.async = true;
            script.defer = true;

            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google Maps API'));

            document.head.appendChild(script);
        });
    }

    async importLibrary(libraryName: string): Promise<any> {
        if (!this.isLoaded()) {
            await this.loadMaps();
        }

        return google.maps.importLibrary(libraryName);
    }

    createMap(container: HTMLElement, options: MapOptions): google.maps.Map {
        if (!this.isLoaded()) {
            throw new Error('Google Maps not loaded');
        }

        const mapOptions: google.maps.MapOptions = {
            center: options.center,
            zoom: options.zoom,
            mapTypeId: options.mapTypeId || google.maps.MapTypeId.ROADMAP,
            styles: options.styles || [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        };

        return new google.maps.Map(container, mapOptions);
    }

    createMarker(map: google.maps.Map, options: MarkerOptions): google.maps.Marker {
        const markerOptions: google.maps.MarkerOptions = {
            position: options.position,
            map: map,
            title: options.title,
            animation: options.animation || google.maps.Animation.DROP
        };

        return new google.maps.Marker(markerOptions);
    }

    createInfoWindow(content: string): google.maps.InfoWindow {
        return new google.maps.InfoWindow({
            content: content
        });
    }

    openGoogleMaps(latitude: number, longitude: number): void {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    }

    openGoogleMapsWithAddress(address: string): void {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    }

    openDirections(latitude: number, longitude: number): void {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        window.open(url, '_blank');
    }

    openDirectionsWithAddress(address: string): void {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    }

    // Getters for reactive state
    get isLoadedSignal() {
        return this.isLoaded.asReadonly();
    }

    get isLoadingSignal() {
        return this.isLoading.asReadonly();
    }

    get errorSignal() {
        return this.error.asReadonly();
    }
}