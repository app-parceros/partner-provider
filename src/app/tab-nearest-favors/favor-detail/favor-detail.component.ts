import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsComponent} from '../../common-components/google-maps/google-maps.component';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {IFavor} from '../../common/models/Favor';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-favor-detail',
    templateUrl: './favor-detail.component.html',
    styleUrls: ['./favor-detail.component.scss'],
})
export class FavorDetailComponent implements OnInit {
    private favorId;
    @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;


    constructor(private readonly  platformService: RestApiPlatformService,
                private activatedRoute: ActivatedRoute) {
    }

    async ngOnInit() {
        this.favorId = this.activatedRoute.snapshot.paramMap.get('favorId');
        await this.includeFavorMarkers();
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

    async includeFavorMarkers() {
        const favorDetail = await this.platformService.getFavorDetail(this.favorId);
        const favorWayPoint: any[] = [];
        for (const step of favorDetail.steps) {
            const lng = step.position.lng;
            const lat = step.position.lat;
            this.mapComponent.addMarker(lat, lng);
           /* favorWayPoint.push({
                location: {lat: step.position.lat, lng: step.position.lng}
            });*/
        }
        // await this.mapComponent.calculateRoute(favorWayPoint);
    }

}
