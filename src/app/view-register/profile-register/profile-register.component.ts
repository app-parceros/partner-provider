import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {StorageService} from '../../common/utils/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../common/models/User';
import {PushNotificationsService} from '../../push-notifications/push-notifications.service';

@Component({
    selector: 'app-profile-register',
    templateUrl: './profile-register.component.html',
    styleUrls: ['./profile-register.component.scss'],
})
export class ProfileRegisterComponent implements OnInit {
    public totalSteps = 3;
    public stepNumber = 0;
    public userProfile: Partial<IUser> = {};


    constructor(private platformService: RestApiPlatformService,
                private storage: StorageService,
                private router: Router,
                private pushNotificationsService: PushNotificationsService,
                private activatedRoute: ActivatedRoute) {
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
        await this.storage.setItem('userProfile', this.userProfile);
        if (this.stepNumber === this.totalSteps - 1) {
            this.updateProfile().then();
        }
    }

    async updateProfile() {
        const autInfo = await this.storage.getItem<any>('authInfo') || {};
        const notificationToken = await this.pushNotificationsService.initConfiguration();
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
            return ['..', this.stepNumber + 1];
        }
        return ['../../../../../../', 'tabs'];
    }


}
