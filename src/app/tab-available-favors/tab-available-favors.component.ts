import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../rest-api/rest-api-platform.service';
import {ResultSet} from '../common/models/ResultSet';
import {IFavor} from '../common/models/Favor';
import {GeoLocationService} from '../common/geo-location/geo-location.service';

@Component({
    selector: 'app-tab-available-favors',
    templateUrl: './tab-available-favors.component.html',
    styleUrls: ['./tab-available-favors.component.scss'],
})
export class TabAvailableFavorsComponent implements OnInit {
    public favorsResultSet: ResultSet<IFavor>;

    constructor(private readonly  platformService: RestApiPlatformService,
                private readonly geoLocationService: GeoLocationService
    ) {
    }

    async ngOnInit() {
        const currentPosition = await this.geoLocationService.getCurrentPosition();
        this.favorsResultSet = await this.platformService.getFavors({
            lat: currentPosition.coords.latitude,
            lng: currentPosition.coords.longitude
        });
    }

    public takeFavor(favor: IFavor) {
        console.log(favor);
    }

}
