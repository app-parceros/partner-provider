import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Plugins, PushNotificationToken} from '@capacitor/core';
import {RestApiPlatformService} from './rest-api/rest-api-platform.service';
import {PushNotificationsService} from './push-notifications/push-notifications.service';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from "./common/utils/storage.service";

const {Geolocation} = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    private token: PushNotificationToken;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private platformService: RestApiPlatformService,
        private pushNotificationsService: PushNotificationsService,
        private storage: StorageService,
        private translateService: TranslateService
    ) {
        this.initializeApp()
            .then();
    }

    async initializeApp() {
        await this.platform.ready();
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        // this.checkDarkTheme();
        console.log('Initializing HomePage');
        this.translateService.use('es');
        this.pushNotificationsService.initConfiguration();
        this.configureUpdatePosition();
    }

    checkDarkTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        console.log('prefersDark', prefersDark);
        /*if (prefersDark.matches) {
            document.body.classList.toggle('dark');
        }*/
    }

    configureUpdatePosition() {
        const self = this;
        Geolocation.watchPosition({
            enableHighAccuracy: false,
            maximumAge: 1800000,
            timeout: 1800000
        }, async position => {
            /*await self.platformService.updateUserPosition('ba56e391-2139-437a-b277-7f20d713142a', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });*/
        });
    }
}
