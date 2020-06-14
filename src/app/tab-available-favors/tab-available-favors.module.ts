import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabAvailableFavorsComponent} from './tab-available-favors.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TabAvailableFavorsRoutingModule} from './tab-available-favors-routing.module';
import {RouterModule} from '@angular/router';
import {FavorDetailComponent} from './favor-detail/favor-detail.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {TranslateModule} from '@ngx-translate/core';
@NgModule({
    declarations: [
        TabAvailableFavorsComponent,
        FavorDetailComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CommonComponentsModule,
        TabAvailableFavorsRoutingModule,
        RouterModule.forChild([{path: '', component: TabAvailableFavorsComponent}]),
        TabAvailableFavorsRoutingModule,
        TranslateModule
    ]
})
export class TabAvailableFavorsModule {
}
