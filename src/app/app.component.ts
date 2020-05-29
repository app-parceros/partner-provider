import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed
} from '@capacitor/core';
import {RestApiPlatformService} from './rest-api/rest-api-platform.service';

const {PushNotifications, Modals} = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private platformService: RestApiPlatformService
    ) {
        this.initializeApp();
    }

    async initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });


        // this.checkDarkTheme();
        console.log('Initializing HomePage');
        this.configureNotifications();
    }

    public async sendRegistrationToServer(token: PushNotificationToken) {
        await this.platformService.sendRegistrationToServer(token);
    }

    checkDarkTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        console.log('prefersDark', prefersDark);
        /*if (prefersDark.matches) {
            document.body.classList.toggle('dark');
        }*/
    }

    public configureNotifications() {

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On succcess, we should be able to receive notifications
        PushNotifications.addListener('registration',
            async (token: PushNotificationToken) => {
                alert('Push registration success, token: ' + token.value);
                console.log('Push registration success, token: ' + token.value);
                await this.sendRegistrationToServer(token);
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                const audio1 = new Audio('assets/audio.mp3');
                console.log('Audio');
                audio1.play();
                // alert('Push received: ' + JSON.stringify(notification));
                console.log('Push received: ', notification);

                const alertRet = Modals.alert({
                    title: notification.title,
                    message: notification.body
                });

            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                alert('Push action performed: ' + JSON.stringify(notification));
                console.log('Push action performed: ' + notification);
            }
        );
    }
}
