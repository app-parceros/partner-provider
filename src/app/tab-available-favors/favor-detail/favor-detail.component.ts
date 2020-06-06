import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsComponent} from '../../common-components/google-maps/google-maps.component';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';

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
        const favor = {
            location: {
                name: 'name prueba 1',
                address: 'address prueba 1',
                position: {
                    lat: center.lat(),
                    lng: center.lng()
                }
            }
        };
        await this.platformService.createFavor(favor);
    }
}
