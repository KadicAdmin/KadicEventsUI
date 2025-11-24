declare namespace google {
    namespace maps {
        enum MapTypeId {
            ROADMAP = 'roadmap',
            SATELLITE = 'satellite',
            HYBRID = 'hybrid',
            TERRAIN = 'terrain'
        }

        enum Animation {
            BOUNCE = 1,
            DROP = 2
        }

        interface MapOptions {
            center?: LatLng | LatLngLiteral;
            zoom?: number;
            mapTypeId?: MapTypeId | string;
            styles?: MapTypeStyle[];
        }

        interface LatLngLiteral {
            lat: number;
            lng: number;
        }

        interface MapTypeStyle {
            featureType?: string;
            elementType?: string;
            stylers?: any[];
        }

        interface MarkerOptions {
            position?: LatLng | LatLngLiteral;
            map?: Map;
            title?: string;
            animation?: Animation;
        }

        interface InfoWindowOptions {
            content?: string | Node;
        }

        class Map {
            constructor(mapDiv: Element, opts?: MapOptions);
        }

        class Marker {
            constructor(opts?: MarkerOptions);
            addListener(eventName: string, handler: Function): void;
            setMap(map: Map | null): void;
        }

        class InfoWindow {
            constructor(opts?: InfoWindowOptions);
            open(map?: Map, anchor?: Marker): void;
        }

        class LatLng {
            constructor(lat: number, lng: number);
        }

        function importLibrary(libraryName: string): Promise<any>;
    }
}
