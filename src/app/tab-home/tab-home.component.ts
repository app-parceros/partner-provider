import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeoLocationService} from '../common/geo-location/geo-location.service';

@Component({
    selector: 'app-tab-home',
    templateUrl: './tab-home.component.html',
    styleUrls: ['./tab-home.component.scss'],
})
export class TabHomeComponent implements OnInit, OnDestroy {

    public darkMode = true;
    public workRadio;
    public testLog = '';
    private geoSubscription: any;

    constructor(private geoLocationService: GeoLocationService) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.darkMode = prefersDark.matches;
    }

    ngOnInit() {
        this.geoSubscription = this.geoLocationService.watchPosition()
            .subscribe(position => {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                this.testLog += `\n${(new Date())} -- ${JSON.stringify(position)}`;
                this.testLog += `prefersDark ..  ${JSON.stringify(prefersDark)}\n`;
            });
    }

    changeMode(event) {
        document.body.classList.toggle('dark');
        /*if (event.returnValue) {
            document.body.classList.toggle('dark');
        } else {
            document.body.classList.toggle('dark');
        }*/
    }

    ngOnDestroy(): void {
        this.geoSubscription.unsubscribe();
    }


}
