import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TabCurrentFavorComponent} from './tab-current-favor.component';
import {RouterModule} from '@angular/router';
import {TabCurrentFavorRoutingModule} from './tab-current-favor-routing.module';


@NgModule({
    declarations: [TabCurrentFavorComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabCurrentFavorComponent}]),
        TabCurrentFavorRoutingModule
    ]
})
export class TabCurrentFavorModule {
}
