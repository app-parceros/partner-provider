import {Inject, Injectable} from '@angular/core';
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed, Capacitor
} from '@capacitor/core';
import {RestApiPlatformService} from '../rest-api/rest-api-platform.service';
import {StorageService} from '../common/utils/storage.service';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');


const {PushNotifications, Modals, Geolocation} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PushNotificationsService {

    private notificationToken: PushNotificationToken;

    constructor(private platformService: RestApiPlatformService,
                private storage: StorageService) {
    }

    public async initConfiguration() {
        const authInfo: any = await this.storage.getItem('authInfo');

        if (authInfo && isPushNotificationsAvailable) { // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();

            // On succcess, we should be able to receive notifications
            PushNotifications.addListener('registration',
                async (token: PushNotificationToken) => {
                    alert('Push registration success, token: ' + token.value);
                    console.log('Push registration success, token: ' + token.value);
                    this.notificationToken = token;
                    await this.platformService.registerNotificationToken(authInfo.userId, token);
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
}
