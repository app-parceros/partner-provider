import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../common/utils/storage.service';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-code-register',
    templateUrl: './code-register.component.html',
    styleUrls: ['./code-register.component.scss'],
})
export class CodeRegisterComponent implements OnInit {

    public code: string;
    public phoneNumber;


    constructor(
        private platformService: RestApiPlatformService,
        private storage: StorageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private msgWrongCode: AlertController,
        private translate: TranslateService
    ){
        translate.setDefaultLang('es');
    }

    ngOnInit() {
        this.phoneNumber = this.activatedRoute.snapshot.paramMap.get('phoneNumber');
    }

    async signIn() {
        // Code validation
        // TODO: To send code to the server for validation => validCode: boolean
        const testCode = '012345';
        let validCode: boolean;
        if (this.code === testCode){
            validCode = true;
        }
        else{
            validCode = false;
        }

        if (validCode === true){
            // Login
            let authInfo;
            const credentials = {
                phone: `+57${this.phoneNumber}`,
                hashCode: this.code
            };
            try {
                authInfo = await this.platformService.signIn(credentials);
            } catch (e) {

            }
            await this.storage.setItem('authInfo',
                {
                    ...authInfo,
                    phoneNumber: `+57${this.phoneNumber}`,
                    code: this.code
                }
            );
            await this.router.navigate(['..', 'profile'], {relativeTo: this.activatedRoute});
        }
        else{
            const alert = await this.msgWrongCode.create({
                header: this.getText('register.code_register.alert_header'),
                message: this.getText('register.code_register.alert_message'),
                buttons: [this.getText('register.code_register.alert_button')]
            });
            await alert.present();
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
