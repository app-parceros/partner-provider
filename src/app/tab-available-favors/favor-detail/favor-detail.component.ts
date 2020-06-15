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
        const center = this.mapComponent.map.getCenter();
        this.mapComponent.addMarker(center.lat(), center.lng());
        const favor: IFavor = {
            name: 'first favor',
            description: 'favor description',
            reward: 1500,
            position: {
                lat: center.lat(),
                lng: center.lng()
            }
        };
        await this.platformService.createFavor(favor);
    }
}
