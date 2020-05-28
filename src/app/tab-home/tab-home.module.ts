import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabHomeComponent} from './tab-home.component';
import {TabHomeRoutingModule} from './tab-home-routing.module';


@NgModule({
    declarations: [TabHomeComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabHomeComponent}]),
        TabHomeRoutingModule
    ]
})
export class TabHomeModule {
}
