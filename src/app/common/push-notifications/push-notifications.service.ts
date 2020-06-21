import {Injectable} from '@angular/core';
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed, Capacitor
} from '@capacitor/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {StorageService} from '../utils/storage.service';
import {Router} from '@angular/router';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');


const {PushNotifications, Modals} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class PushNotificationsService {

    private notificationToken: PushNotificationToken;

    constructor(private platformService: RestApiPlatformService,
                private router: Router,
                private storage: StorageService) {
    }

    public async initConfiguration() {
        const authInfo: any = await this.storage.getItem('authInfo');
        const registration = new Promise<PushNotificationToken>(async (resolve, reject) => {
            if (authInfo && isPushNotificationsAvailable) { // Register with Apple / Google to receive push via APNS/FCM
                await PushNotifications.register();

                // On succcess, we should be able to receive notifications
                PushNotifications.addListener('registration',
                    async (token: PushNotificationToken) => {
                        // alert('Push registration success, token: ' + token.value);
                        console.log('Push registration success, token: ' + token.value);
                        this.notificationToken = token;
                        resolve(token);
                        // await this.platformService.registerNotificationToken(authInfo.userId, token);
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
                    (action: PushNotificationActionPerformed) => {
                        if (action?.notification?.data) {
                            const data = action?.notification?.data;
                            if (data && data.favorId) { // todo: define custom action
                                this.router.navigate(['tabs', 'nearest-favors', 'favor', data.favorId]).then();
                            } else {
                                // other nav
                            }
                        }
                    }
                );
            } else {
                resolve({
                    value: null
                });
            }
        });
        return registration;
    }

    getNotificationToken(): PushNotificationToken {
        return this.notificationToken;
    }
}
