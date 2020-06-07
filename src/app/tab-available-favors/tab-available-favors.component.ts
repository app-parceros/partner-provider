import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../rest-api/rest-api-platform.service';
import {ResultSet} from '../common/models/ResultSet';
import {IFavor} from '../common/models/Favor';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
    selector: 'app-tab-available-favors',
    templateUrl: './tab-available-favors.component.html',
    styleUrls: ['./tab-available-favors.component.scss'],
})
export class TabAvailableFavorsComponent implements OnInit {
    public favorsResultSet: ResultSet<IFavor>;

    constructor(private readonly  platformService: RestApiPlatformService) {
    }

    async ngOnInit() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);
        this.favorsResultSet = await this.platformService.getFavors({
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude
        });
    }

    public takeFavor(favor: IFavor) {
        console.log(favor);
    }

}
