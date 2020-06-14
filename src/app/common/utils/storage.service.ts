import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private storage: Storage) {
    }

    async setItem(key: string, item: string) {
        await this.storage.set(key, JSON.stringify(item));
    }

    async getItem<T>(key: string): Promise<T> {
        const item = await this.storage.get(key);
        return JSON.parse(item);
    }
}
