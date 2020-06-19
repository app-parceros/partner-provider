import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeoLocationService} from '../common/geo-location/geo-location.service';
import {Subscription} from 'rxjs';
import {RestApiPlatformService} from '../rest-api/rest-api-platform.service';
import {StorageService} from '../common/utils/storage.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
    private geoSubscription: Subscription;

    constructor(private geoLocationService: GeoLocationService,
                private platformService: RestApiPlatformService,
                private storage: StorageService) {
    }

    async ngOnInit() {
        const autInfo = await this.storage.getItem<any>('authInfo') || {};
        this.geoSubscription = this.geoLocationService
            .watchPosition()
            .subscribe(async position => {
                await this.platformService.updateUserPosition(autInfo.userId, {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                });
            });
    }

    ngOnDestroy(): void {
        this.geoSubscription.unsubscribe();
    }

}
