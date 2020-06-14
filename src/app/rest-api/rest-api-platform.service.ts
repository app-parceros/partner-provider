import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlatformConfig} from './platform-config';
import {PushNotificationToken} from '@capacitor/core';
import {ResultSet} from '../common/models/ResultSet';
import {IFavor} from '../common/models/Favor';
import {IPosition} from '../common/models/Location';

@Injectable({
    providedIn: 'root'
})
export class RestApiPlatformService {

    constructor(
        @Inject('platformConfig') private platformConfig: PlatformConfig,
        private httpClient: HttpClient) {
    }

    sendRegistrationToServer(token: PushNotificationToken) {
        const url = `${this.platformConfig.apiUrl}/api/notification/token`;
        return this.httpClient.post<any>(url, token).toPromise();
    }

    updateUserPosition(userId: Guid, position: IPosition) {
        const url = `${this.platformConfig.apiUrl}/api/user/${userId}/position`;
        return this.httpClient.post<IPosition>(url, position).toPromise();
    }

    getFavors(position: any): Promise<ResultSet<IFavor>> {
        const url = `${this.platformConfig.apiUrl}/api/favor?lat=${position.lat}&lng=${position.lng}&radius=1380`;
        return this.httpClient.get<any>(url).toPromise();
    }

    async createFavor(favor: IFavor) {
        const url = `${this.platformConfig.apiUrl}/api/favor`;
        return this.httpClient.post<IFavor>(url, favor).toPromise();
    }

    async sendPhone(phoneNumber) {
        const url = `${this.platformConfig.apiUrl}/api/auth/phone`;
        return this.httpClient.post<IFavor>(url, {phone: `+57${phoneNumber}`}).toPromise();
    }
}
