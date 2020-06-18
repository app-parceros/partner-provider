import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeoLocationService} from '../common/geo-location/geo-location.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
    private geoSubscription: Subscription;

    constructor(private geoLocationService: GeoLocationService) {
    }

    ngOnInit(): void {
        this.geoSubscription = this.geoLocationService.watchPosition()
            .subscribe();
    }

    ngOnDestroy(): void {
        this.geoSubscription.unsubscribe();
    }

}
