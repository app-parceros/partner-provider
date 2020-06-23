import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabHelpComponent} from './tab-help.component';
import {TabHelpRoutingModule} from './tab-help-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonComponentsModule} from '../common-components/common-components.module';

@NgModule({
    declarations: [TabHelpComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabHelpComponent}]),
        TabHelpRoutingModule,
        TranslateModule,
        CommonComponentsModule
    ]
})
export class TabHelpModule {
}
