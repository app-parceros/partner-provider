import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {StorageService} from '../../common/utils/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../common/models/User';
import {PushNotificationsService} from '../../common/push-notifications/push-notifications.service';
import {RegexTypes} from '../../RegexTypes';
import {TranslateService} from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-profile-register',
    templateUrl: './profile-register.component.html',
    styleUrls: ['./profile-register.component.scss'],
})
export class ProfileRegisterComponent implements OnInit {
    public totalSteps = 3;
    public stepNumber = 0;
    public userProfile: Partial<IUser> = {};

    constructor(
        private platformService: RestApiPlatformService,
        private storage: StorageService,
        private router: Router,
        private pushNotificationsService: PushNotificationsService,
        private activatedRoute: ActivatedRoute,
        private translate: TranslateService,
        private msgWrongData: AlertController,
    ) {
        translate.setDefaultLang('es');
    }

    async ngOnInit() {
        this.userProfile = await this.storage.getItem<IUser>('userProfile') || {};
        this.stepNumber = +this.activatedRoute.snapshot.paramMap.get('stepNumber');
        this.userProfile.phoneNumber = this.activatedRoute.snapshot.paramMap.get('phoneNumber');
    }

    async onBack() {
        await this.storage.setItem('userProfile', this.userProfile);
    }

    async onNext() {
        let regExp;
        let match;
        let msgAlert;
        // const regExp = new RegExp(RegexTypes.LETTERS150);
        // const match = this.userProfile.name.match(regExp);
        switch (this.stepNumber) {
            case 0:
                regExp = new RegExp(RegexTypes.LETTERS150);
                match = this.userProfile.name.match(regExp) && this.userProfile.lastName.match(regExp);
                msgAlert = 'register.profile_register.alert_msg_names';
                break;
            case 1:
                regExp = new RegExp(RegexTypes.EMAIL2);
                match = this.userProfile.email.match(regExp);
                msgAlert = 'register.profile_register.alert_msg_email';
                break;
            case 2:
                regExp = new RegExp(RegexTypes.NUMBER_ONLY);
                match = this.userProfile.identification.match(regExp);
                msgAlert = 'register.profile_register.alert_msg_id';
                break;
            default:
                match = true;
                break;
        }
        if (!match) {
            const alert = await this.msgWrongData.create({
                header: this.getText('register.profile_register.alert_header'),
                message: this.getText(msgAlert),
                buttons: [this.getText('register.profile_register.alert_button')]
            });
            await alert.present();
        } else{
            await this.storage.setItem('userProfile', this.userProfile);
            if (this.stepNumber === this.totalSteps - 1) {
                this.updateProfile().then();
            }
            const link = this.getNexRouterLink();
            this.router.navigate(link);
        }

    }

    async updateProfile() {
        const autInfo = await this.storage.getItem<any>('authInfo') || {};
        const notificationToken = this.pushNotificationsService.getNotificationToken();
        autInfo.notificationToken = notificationToken;
        await this.storage.setItem('userProfile', this.userProfile);
        this.platformService.updateUserProfile(
            autInfo.userId,
            {
                id: autInfo.userId,
                notificationToken: notificationToken.value,
                ...this.userProfile
            }).then();
    }

    getBackRouterLink() {
        if (this.stepNumber > 0) {
            return ['..', this.stepNumber - 1];
        }
        return ['../../../../'];
    }

    getNexRouterLink() {
        if (this.stepNumber < this.totalSteps) {
            // return ['..', this.stepNumber + 1];
            return ['/register', 'phone', this.userProfile.phoneNumber, 'profile', 'step',  this.stepNumber + 1];
        }
        return ['../../../../../../', 'tabs'];
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
