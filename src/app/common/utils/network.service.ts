import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
const { Network } = Plugins;

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable({
    providedIn: 'root'
})

export class NetworkService {

    private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
    networkStatus: any;
    networkListener: PluginListenerHandle;

    constructor(private toastController: ToastController, private plt: Platform) {
        this.plt.ready().then(() => {
            this.initializeNetworkEvents();
            const status =  navigator.onLine ? ConnectionStatus.Online : ConnectionStatus.Offline;
            this.status.next(status);
        });
    }

    public initializeNetworkEvents() {
        this.networkListener = Network.addListener('networkStatusChange', (status) => {
            this.networkStatus = status;
            if (status.connected){
                this.updateNetworkStatus(ConnectionStatus.Online);
            }else{
                this.updateNetworkStatus(ConnectionStatus.Offline);
            }
        });
    }

    private async updateNetworkStatus(status: ConnectionStatus) {
        this.status.next(status);
        const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
        const toast = this.toastController.create({
            message: `Parcero estamos ${connection}`,
            duration: 3000,
            position: 'bottom'
        });
        toast.then(ele => ele.present());
    }

    public onNetworkChange(): Observable<ConnectionStatus> {
        return this.status.asObservable();
    }

    public getCurrentNetworkStatus(): ConnectionStatus {
        return this.status.getValue();
    }
}
