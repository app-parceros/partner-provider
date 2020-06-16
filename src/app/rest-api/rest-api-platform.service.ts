import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlatformConfig} from './platform-config';
import {PushNotificationToken} from '@capacitor/core';
import {ResultSet} from '../common/models/ResultSet';
import {IFavor} from '../common/models/Favor';
import {IPosition} from '../common/models/Location';
import {IFavorStep} from '../common/models/FavorStep';
import {IUser} from "../common/models/User";


@Injectable({
    providedIn: 'root'
})
export class RestApiPlatformService {

    constructor(
        @Inject('platformConfig') private platformConfig: PlatformConfig,
        private httpClient: HttpClient) {
    }

    registerNotificationToken(userId: Guid, token: any) {
        const url = `${this.platformConfig.apiUrl}/api/user/${userId}/token`;
        return this.httpClient.post<any>(url, token).toPromise();
    }

    updateUserPosition(userId: Guid, position: IPosition) {
        const url = `${this.platformConfig.apiUrl}/api/user/${userId}/position`;
        return this.httpClient.post<IPosition>(url, position).toPromise();
    }

    async updateUserProfile(userId: Guid, user: Partial<IUser>) {
        const url = `${this.platformConfig.apiUrl}/api/user/${user.id}`;
        return this.httpClient.put<IFavor>(url, user).toPromise();
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

    async signIn(credentials: { phone: string, hashCode: string }) {
        const url = `${this.platformConfig.apiUrl}/api/auth/signin`;
        return this.httpClient.post<IFavor>(url, credentials).toPromise();
    }

    async getFavorDetail(favorId: Guid):Promise<IFavor> {
        //const url = `${this.platformConfig.apiUrl}/api/favor/${favorId}`;
        //return this.httpClient.get<any>(url).toPromise();
        console.log("getFavorDetail");
        const favorDetailMock: IFavor = {
            creationDate: (new Date()).toString(),
            description: 'favor description',
            position: null,
            name: 'Luis',
            reward: 4000,
            steps: [
                {
                    description: 'step number one',
                    position: {lat: 4.725758098247824, lng: -74.03076787201972}
                },
                {
                    description: 'step number two',
                    position: {lat: 4.735758098247834, lng: -74.04076787201982}
                },
                {
                    description: 'step number three',
                    position: {lat: 4.745758098247844, lng: -74.05076787201992}
                }
            ]
        };
        return new Promise((resolve, reject) => {
            resolve(favorDetailMock);
        });
    }
}
