import {Component, OnInit} from '@angular/core';
import {RestApiPlatformService} from '../../rest-api/rest-api-platform.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from "../../common/utils/storage.service";
import {relativeFrom} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
    selector: 'app-code-register',
    templateUrl: './code-register.component.html',
    styleUrls: ['./code-register.component.scss'],
})
export class CodeRegisterComponent implements OnInit {

    public code: string;
    public phoneNumber;


    constructor(private platformService: RestApiPlatformService,
                private storage: StorageService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.phoneNumber = this.activatedRoute.snapshot.paramMap.get('phoneNumber');
    }

    async signIn() {
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
        await this.router.navigate(['']);
    }
}
