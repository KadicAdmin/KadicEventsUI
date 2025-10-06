import { Component, input, OnInit, OnDestroy, signal, effect, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventMetaItemComponent } from '../../molecules/event-meta-item/event-meta-item.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'event-location',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChipModule, DividerModule, CardModule, TooltipModule],
  templateUrl: './event-location.component.html',
})
export class EventLocationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLElement>;
  readonly isVirtual = input<boolean>(false);
  readonly fullAddress = input<string>('');
  readonly venueName = input<string>('');
  readonly virtualPlatform = input<string>('');
  readonly virtualLink = input<string>('');
  readonly parkingInfo = input<string>('');
  readonly publicTransport = input<string>('');
  readonly showMap = input<boolean>(true);
  readonly latitude = input.required<number | null>();
  readonly longitude = input.required<number | null>();

  readonly mapLoaded = signal<boolean>(false);
  readonly mapError = signal<string>('');

  private map: google.maps.Map | null = null;
  private marker: google.maps.Marker | null = null;

 
  ngAfterViewInit() {
    queueMicrotask(() => {
      const el = document.getElementById('event-map-container');
      console.log('microtask container query:', el);
      if (!this.mapContainer && el) {
        // Fallback: assign the native element
        this.mapContainer = { nativeElement: el } as unknown as ElementRef<HTMLElement>;
      }
      this.initializeMap();
    });
  }

  private async initializeMap() {

    if (!this.mapContainer?.nativeElement) {
      setTimeout(() => this.initializeMap(), 200);
      return;
    }

    if (!this.showMap() || this.isVirtual()) {
      this.mapLoaded.set(false);
      return;
    }

    const lat = this.latitude();
    const lng = this.longitude();

    if (lat == null || lng == null) {
      this.mapError.set('Coordenadas no disponibles');
      this.mapLoaded.set(false);
      return;
    }

    try {

      const el = this.mapContainer.nativeElement as HTMLElement;
      el.style.width = el.style.width || '100%';
      el.style.height = el.style.height || '256px';
      const rect = el.getBoundingClientRect();
      console.log('Map container size:', rect.width, rect.height);
      console.log('Creating map with container:', el);
      const mapOptions: google.maps.MapOptions = {
        center: { lat, lng },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(el, mapOptions);
      console.log('Map created:', this.map);

      this.marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: this.venueName() || this.fullAddress()
      });
      console.log('Marker created:', this.marker);

      // Force resize and recenter after first render
      setTimeout(() => {
        console.log('Forcing map recenter via panTo');
        const center = { lat, lng } as google.maps.LatLngLiteral;
        // Some local typings may miss setCenter; panTo is widely available
        (this.map as any).panTo(center);
      }, 0);

      // Wait for tiles to load before marking as loaded
      // Fallback: mark as loaded after a short delay if tilesloaded is not available
      setTimeout(() => {
        console.log('Marking map as loaded (timeout fallback)');
        this.mapLoaded.set(true);
        this.mapError.set('');
        console.log('Map initialized successfully');
      }, 300);
    } catch (error) {
      console.error('Error initializing map:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
      this.mapError.set('Error al cargar el mapa');
    }
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

  ngOnDestroy() {
    if (this.marker) {
      this.marker.setMap(null);
    }
    if (this.map) {
      this.map = null;
    }
  }

  openGoogleMaps() {
    if (this.latitude() && this.longitude()) {
      const url = `https://www.google.com/maps?q=${this.latitude()},${this.longitude()}`;
      window.open(url, '_blank');
    } else if (this.fullAddress()) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.fullAddress())}`;
      window.open(url, '_blank');
    }
  }

  openDirections() {
    if (this.latitude() && this.longitude()) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${this.latitude()},${this.longitude()}`;
      window.open(url, '_blank');
    } else if (this.fullAddress()) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.fullAddress())}`;
      window.open(url, '_blank');
    }
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
