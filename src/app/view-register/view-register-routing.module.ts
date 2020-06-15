import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CodeRegisterComponent} from './code-register/code-register.component';
import {PhoneRegisterComponent} from './phone-register/phone-register.component';
import {ProfileRegisterComponent} from './profile-register/profile-register.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: 'phone',
        component: PhoneRegisterComponent,

    },
    {
        path: 'phone/:phoneNumber/code',
        component: CodeRegisterComponent

    },
    {
        path: 'phone/:phoneNumber/profile',
        children: [
            {
                path: 'step/:stepNumber',
                component: ProfileRegisterComponent
            },
            {
                path: '',
                redirectTo: 'step/0',
                pathMatch: 'full'
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewRegisterRoutingModule {
}
