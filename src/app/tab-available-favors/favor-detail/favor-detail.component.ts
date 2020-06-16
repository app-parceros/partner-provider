import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsComponent} from '../../common-components/google-maps/google-maps.component';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {IFavor} from '../../common/models/Favor';

@Component({
    selector: 'app-favor-detail',
    templateUrl: './favor-detail.component.html',
    styleUrls: ['./favor-detail.component.scss'],
})
export class FavorDetailComponent implements OnInit {
    @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

    constructor(private readonly  platformService: RestApiPlatformService) {
    }

    ngOnInit() {
    }

    async addMarker() {
        await this.includeFavorMarkers();

        console.log("before calculate route")
        //this.mapComponent.calculateRoute();
    }

    async includeFavorMarkers() {
        console.log("includeFavorMarkers");
        const favorDetail = await this.platformService.getFavorDetail('favor');
        for (const step of favorDetail.steps) {
            const lng = step.position.lng;
            const lat = step.position.lat;
            console.log(step);
            this.mapComponent.addMarker(lat, lng);

        }

    }
}
