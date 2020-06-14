import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CodeRegisterComponent} from './code-register/code-register.component';
import {PhoneRegisterComponent} from './phone-register/phone-register.component';
import {ProfileRegisterComponent} from './profile-register/profile-register.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
    {
        path: 'phone',
        component: PhoneRegisterComponent,

    },
    {
        path: 'code',
        component: CodeRegisterComponent

    },
    {
        path: 'profile',
        component: ProfileRegisterComponent
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewRegisterRoutingModule {
}
