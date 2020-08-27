/// <reference types='@types/googlemaps' />
import {Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Plugins} from '@capacitor/core';
import {GeoLocationService} from '../../common/geo-location/geo-location.service';
import DirectionsWaypoint = google.maps.DirectionsWaypoint;
import DirectionsRequest = google.maps.DirectionsRequest;
import {IPosition} from "../../common/models/Location";
import {IFavorStep} from "../../common/models/FavorStep";

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
    private isInjectingSDK = false;
    private injectingSDKPromise;

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
        if (!this.isInjectingSDK) {
            this.isInjectingSDK = true;
            this.injectingSDKPromise = new Promise((resolve, reject) => {
                window['mapInit'] = () => {
                    this.mapsLoaded = true;
                    this.isInjectingSDK = false;
                    window['googleInstance'] = google;
                    resolve(true);
                };

                if (window['mapScript']) {
                    this.renderer.removeChild(this.document.body, window['mapScript']);
                }
                const script = this.renderer.createElement('script');
                window['mapScript'] = script;
                script.id = 'googleMaps';
                script.src = 'https://partner-platform-dev.herokuapp.com/maps/api/js?&callback=mapInit';
                this.renderer.appendChild(this.document.body, script);
            });
        }
        return this.injectingSDKPromise;
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

    private async isSDKLoaded(): Promise<any> {
        /*return new Promise((resolve, reject) => {
            // window['mapInit'] = () => {
                resolve(true);
            // };
        });*/

        await this.init();
    }

    public async addMarker(label: string, positions: IPosition[]) {
        await this.init();

        const icon = {
            url: './assets/imgs/map-marker-pin.png',
            scaledSize: new google.maps.Size(50, 50)
        };
        for (const position of positions) {
            const latLng = new google.maps.LatLng(position.lat, position.lng);
            const marker = new google.maps.Marker(
                {
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon,
                    label
                }
            );
            this.markers.push(marker);
        }
    }


    public async addStepsMaker( steps: IFavorStep[]) {
        await this.init();

        const icon = {
            url: './assets/imgs/map-marker-pin.png',
            scaledSize: new google.maps.Size(50, 50)
        };
        for (const step of steps) {
            const latLng = new google.maps.LatLng(step.position.lat, step.position.lng);
            const marker = new google.maps.Marker(
                {
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon,
                    label: step.description
                }
            );
            this.markers.push(marker);
        }
    }

    async calculateRoute(directionsWaypoints?: DirectionsWaypoint []) {
        console.log('calculateRoute', directionsWaypoints);
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();

        // this.map.fitBounds(this.bounds);
        const request: DirectionsRequest = {
            /*origin: new google.maps.LatLng(4.725758098247824, -74.03076787201972),
            destination: new google.maps.LatLng(4.735758098247824, -74.04076787201972),*/
            waypoints: directionsWaypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true
        };

        directionsService.route(request, (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log('DirectionsStatus ', response);
                directionsDisplay.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });

    }

}
