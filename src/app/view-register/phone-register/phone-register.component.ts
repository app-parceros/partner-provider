import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';

@Component({
    selector: 'app-phone-register',
    templateUrl: './phone-register.component.html',
    styleUrls: ['./phone-register.component.scss'],
})
export class PhoneRegisterComponent implements OnInit {
    public phoneNumber: number;

    constructor(private platformService: RestApiPlatformService) {
    }

    ngOnInit() {
    }

    async sendPhone() {
        await this.platformService.sendPhone(this.phoneNumber);
    }
}
