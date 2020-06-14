import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeRegisterComponent} from './code-register/code-register.component';
import {PhoneRegisterComponent} from './phone-register/phone-register.component';
import {ProfileRegisterComponent} from './profile-register/profile-register.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {ViewRegisterRoutingModule} from './view-register-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
    declarations: [
        CodeRegisterComponent,
        PhoneRegisterComponent,
        ProfileRegisterComponent,
        TermsAndConditionsComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ViewRegisterRoutingModule,
        TranslateModule
    ]
})
export class ViewRegisterModule {
}
