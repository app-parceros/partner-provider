/// <reference types='@types/googlemaps' />
import {Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {GeolocationPosition, Plugins} from '@capacitor/core';
import {Observable} from "rxjs";
import {GeoLocationService} from "../../common/geo-location/geo-location.service";
import DirectionsWaypoint = google.maps.DirectionsWaypoint;
import DirectionsRequest = google.maps.DirectionsRequest;

const {Network} = Plugins;

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.component.html',
    styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

    @Input() apiKey: string;

    public map: any;
    public markers: any[] = [];
    private mapsLoaded = false;
    private networkHandler = null;
    public waypoints: any[] = [];

    constructor(private renderer: Renderer2,
                private element: ElementRef,
                private geoLocationService: GeoLocationService,
                @Inject(DOCUMENT) private document) {

    }

    async ngOnInit() {
        await this.init();
        console.log('Google Maps ready.');
        const icon = {
            url: './assets/icon/favicon.png',
            scaledSize: new google.maps.Size(50, 50)
        };
        const latLng = new google.maps.LatLng(4.725758098247824, -74.03076787201982);
        const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon,
            label: 'Doña jimena'
        });
        this.markers.push(marker);
    }

    private async init(): Promise<any> {
        await this.loadSDK();
        await this.initMap();
    }

    private async loadSDK(): Promise<any> {
        if (!this.mapsLoaded) {
            let status;
            try {
                status = await Network.getStatus();
                if (status.connected) {
                    await this.injectSDK();
                    console.log('SDK ready.');
                } else {
                    if (this.networkHandler == null) {
                        this.networkHandler = Network.addListener('networkStatusChange', async (status2) => {
                            if (status2.connected) {
                                this.networkHandler.remove();
                                await this.init();
                                console.log('Google Maps ready.');
                            }
                        });
                    }
                    console.log('Not online');
                }
            } catch (e) {
                // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                if (navigator.onLine) {
                    await this.injectSDK();
                    console.log('SDK ready. navigator.onLine');
                } else {
                    console.warn('Not online');
                }
            }

        } else {
            console.warn('SDK already loaded');
        }
    }

    private injectSDK(): Promise<any> {
        return new Promise((resolve, reject) => {
            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            };
            const script = this.renderer.createElement('script');
            script.id = 'googleMaps';
            script.src = 'https://partner-platform-dev.herokuapp.com/maps/api/js?&callback=mapInit';
            this.renderer.appendChild(this.document.body, script);
        });
    }


    private async initMap(): Promise<any> {
        const currentPosition: any = await this.geoLocationService.getCurrentPosition();
        const latLng = new google.maps.LatLng(
            currentPosition.coords.latitude,
            currentPosition.coords.longitude);

        const mapOptions = {
            center: latLng,
            zoom: 15
        };
        this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
    }

    public addMarker(lat: number, lng: number): void {
        const latLng = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.Marker(
            {
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            }
        );
        this.markers.push(marker);
    }


    async calculateRoute(directionsWaypoint?: DirectionsWaypoint []) {
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();

        // this.map.fitBounds(this.bounds);
        const request: DirectionsRequest = {
            origin: new google.maps.LatLng(4.725758098247824, -74.03076787201972),
            destination: new google.maps.LatLng(4.735758098247824, -74.04076787201972),
            waypoints: this.waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true
        };

        directionsService.route(request, (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(response);
                // directionsDisplay.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });

    }

}
