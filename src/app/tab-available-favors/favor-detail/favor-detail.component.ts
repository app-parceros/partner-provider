import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsComponent} from '../../common-components/google-maps/google-maps.component';

@Component({
    selector: 'app-favor-detail',
    templateUrl: './favor-detail.component.html',
    styleUrls: ['./favor-detail.component.scss'],
})
export class FavorDetailComponent implements OnInit {
    @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

    constructor() {
    }

    ngOnInit() {
    }

    addMarker() {
        const center = this.mapComponent.map.getCenter();
        this.mapComponent.addMarker(center.lat(), center.lng());
    }
}
