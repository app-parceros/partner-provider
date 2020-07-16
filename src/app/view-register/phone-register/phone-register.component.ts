import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-phone-register',
    templateUrl: './phone-register.component.html',
    styleUrls: ['./phone-register.component.scss'],
})
export class PhoneRegisterComponent implements OnInit {
    public phoneNumber: number;
    validPrefix = ['30', '31', '32', '35'];

    constructor(
        private platformService: RestApiPlatformService,
        private msgWrongNumber: AlertController,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    async sendPhone() {
        const phoneString: string = String(this.phoneNumber);
        let badNumber = false;
        const regExp = new RegExp('^(300|301|317|314|315)[0-9]{3}[0-9]{4}$');
        const match = phoneString.match(regExp);
        console.log('resultado', match);
        if (!match) {
            badNumber = true;
            const alert = await this.msgWrongNumber.create({
                header: '¡Número erroneo!',
                message: 'Ingresa un número con 10 digitos y que corresponda al formato usado en Colombia',
                buttons: ['Intentar de nuevo']
            });
            await alert.present();
        } else {
            this.router.navigate(['/register', 'phone', this.phoneNumber, 'code']);
            await this.platformService.sendPhone(this.phoneNumber);
            // console.log('todo normal');
        }
    }


}
