import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlatformConfig} from './platform-config';
import {PushNotificationToken} from '@capacitor/core';
import {ResultSet} from '../common/models/ResultSet';
import {Favor} from '../common/models/Favor';

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

    testApi() {
        const url = `${this.platformConfig.apiUrl}/api/system`;
        return this.httpClient.get<any>(url).toPromise();
    }

    getFavors(position: any): Promise<ResultSet<Favor>> {
        const url = `${this.platformConfig.apiUrl}/api/favor?lat=${position.lat}&lng=${position.lng}&radius=1380`;
        return this.httpClient.get<any>(url).toPromise();
    }

    async createFavor(favor: any) {
        const url = `${this.platformConfig.apiUrl}/api/favor`;
        return this.httpClient.post<any>(url, favor).toPromise();
    }
}
