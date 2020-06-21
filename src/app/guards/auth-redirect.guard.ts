import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {StorageService} from '../common/utils/storage.service';
import {Capacitor} from '@capacitor/core';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

@Injectable({
    providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
    constructor(private router: Router, private storage: StorageService) {
    }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        console.log(route);
        if (isPushNotificationsAvailable) {
            const authInfo: any = await this.storage.getItem('authInfo');

            if (!authInfo) {
                await this.router.navigate(['register', 'terms-and-conditions']);
                return false;
            }
           /* if (authInfo && !authInfo.notificationToken) {
                await this.router.navigate(['register', 'terms-and-conditions']);
                return false;
            }*/
        }
        return true;
    }
}



