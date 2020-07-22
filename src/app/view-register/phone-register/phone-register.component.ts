import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-phone-register',
    templateUrl: './phone-register.component.html',
    styleUrls: ['./phone-register.component.scss'],
})
export class PhoneRegisterComponent implements OnInit {
    public phoneNumber: number;
    constructor(
        private platformService: RestApiPlatformService,
        private msgWrongNumber: AlertController,
        private router: Router,
        private translate: TranslateService
    ) {
        translate.setDefaultLang('es');
    }

    ngOnInit() {
    }

    async sendPhone() {
        const phoneString: string = String(this.phoneNumber);
        let badNumber = false;
        const regExp = new RegExp('^(300|301|302|303|304|305|310|311|312|313|314|315|316|317|318|319|320|321|322|323|350|351)[0-9]{3}[0-9]{4}$');
        const match = phoneString.match(regExp);
        console.log('resultado', match);
        if (!match) {
            badNumber = true;
            const alert = await this.msgWrongNumber.create({
                header: this.getText('register.phone_register.alert_header'),
                message: this.getText('register.phone_register.alert_message'),
                buttons: [this.getText('register.phone_register.alert_button')]
            });
            await alert.present();
        } else {
            this.router.navigate(['/register', 'phone', this.phoneNumber, 'code']);
            await this.platformService.sendPhone(this.phoneNumber);
            // console.log('todo normal');
        }
    }

    getText(textToUse: string): string {
        let textToShow;
        this.translate.get(textToUse).subscribe(
            value => {
                // value is our translated string
                textToShow = value;
                // return textToUse;
            }
        );
        return textToShow;
    }

}
