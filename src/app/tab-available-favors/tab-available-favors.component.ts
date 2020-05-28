import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../rest-api/rest-api-platform.service';
import {ResultSet} from '../common/models/ResultSet';
import {Favor} from '../common/models/Favor';

@Component({
    selector: 'app-tab-available-favors',
    templateUrl: './tab-available-favors.component.html',
    styleUrls: ['./tab-available-favors.component.scss'],
})
export class TabAvailableFavorsComponent implements OnInit {
    public favorsResultSet: ResultSet<Favor>;

    constructor(private readonly  platformService: RestApiPlatformService) {
    }

    async ngOnInit() {
        this.favorsResultSet = await this.platformService.getFavors();
    }

    public takeFavor(favor: Favor) {
        console.log(favor);
    }

}
