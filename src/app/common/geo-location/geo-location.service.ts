import {Injectable} from '@angular/core';
import {GeolocationPosition, Plugins} from '@capacitor/core';
import {StorageService} from '../utils/storage.service';
import {Observable} from 'rxjs';

const {Geolocation} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class GeoLocationService {
    private currentPosition: GeolocationPosition;

    constructor(private storage: StorageService) {
    }

    public async getCurrentPosition(): Promise<GeolocationPosition> {
        if (!(this.currentPosition && this.currentPosition.coords)) {
            try {
                this.currentPosition = await Geolocation.getCurrentPosition();
            } catch (e) {
                console.log('Error getting current position');
            }
        }
        return this.currentPosition;
    }


    public watchPosition(): Observable<GeolocationPosition> {
        return new Observable(
            observer => {
                Geolocation.watchPosition({
                    enableHighAccuracy: false,
                    maximumAge: 1000,
                    timeout: 500
                }, async (position) => {
                    console.log('in watch ..', (new Date()), position);
                    if (position && position.coords) {
                        this.currentPosition = position;
                        observer.next(position);
                    }
                });
            });
        // .pipe(debounceTime(1200000));
    }
}
