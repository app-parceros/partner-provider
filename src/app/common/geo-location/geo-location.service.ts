import {Injectable} from '@angular/core';
import {Capacitor, GeolocationPosition, Plugins} from '@capacitor/core';
import {StorageService} from '../utils/storage.service';
import {Observable} from 'rxjs';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
const {PushNotifications, Modals, Geolocation, Network} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class GeoLocationService {
    constructor(
        private storage: StorageService) {
    }

    public getCurrentPosition(): Promise<GeolocationPosition> {
        return Geolocation.getCurrentPosition();
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
                    observer.next(position);
                });
            });
        // .pipe(debounceTime(1200000));
    }
}
