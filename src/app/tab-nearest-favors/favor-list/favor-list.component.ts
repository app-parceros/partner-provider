import {Component, OnInit} from '@angular/core';
import {IFavor} from '../../common/models/Favor';
import {GeoLocationService} from '../../common/geo-location/geo-location.service';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {ResultSet} from '../../common/models/ResultSet';

@Component({
    selector: 'app-favor-list',
    templateUrl: './favor-list.component.html',
    styleUrls: ['./favor-list.component.scss'],
})
export class FavorListComponent implements OnInit {

    public favorsResultSet: ResultSet<IFavor>;

    constructor(private readonly  platformService: RestApiPlatformService,
                private readonly geoLocationService: GeoLocationService
    ) {
    }

    async ngOnInit() {
        await this.loadNearestFavors();
    }

    async loadNearestFavors() {
        const currentPosition = await this.geoLocationService.getCurrentPosition();
        this.favorsResultSet = await this.platformService.getFavors({
            lat: 4.70557962,
            lng: -74.02690778
        });
    }

    public takeFavor(favor: IFavor) {
        console.log(favor);
    }
}
