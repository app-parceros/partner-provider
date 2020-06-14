import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabSummaryComponent} from './tab-summary.component';
import {TabSummaryRoutingModule} from './tab-summary-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabSummaryComponent}]),
        TabSummaryRoutingModule,
        TranslateModule
    ]
})
export class TabSummaryModule {
}
