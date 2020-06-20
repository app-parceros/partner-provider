import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavorDetailComponent} from './favor-detail/favor-detail.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {TranslateModule} from '@ngx-translate/core';
import {FavorListComponent} from './favor-list/favor-list.component';
import {TabNearestFavorsRoutingModule} from './tab-nearest-favors-routing.module';

@NgModule({
        declarations: [
            FavorListComponent,
            FavorDetailComponent
        ],
        imports: [
            IonicModule,
            CommonModule,
            FormsModule,
            CommonComponentsModule,
            TabNearestFavorsRoutingModule,
            TranslateModule
        ]
    }
)
export class TabNearestFavorsModule {
}
