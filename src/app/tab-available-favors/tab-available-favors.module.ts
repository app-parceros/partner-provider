import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabAvailableFavorsComponent} from './tab-available-favors.component';
import {IonicModule, IonList} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TabAvailableFavorsRoutingModule} from './tab-available-favors-routing.module';
import {RouterModule} from '@angular/router';
import {FavorDetailComponent} from './favor-detail/favor-detail.component';

@NgModule({
    declarations: [
        TabAvailableFavorsComponent,
        FavorDetailComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,

        TabAvailableFavorsRoutingModule,
        RouterModule.forChild([{path: '', component: TabAvailableFavorsComponent}]),
        TabAvailableFavorsRoutingModule
    ]
})
export class TabAvailableFavorsModule {
}
