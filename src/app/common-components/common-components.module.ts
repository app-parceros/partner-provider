import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
import {LoadingComponent} from './loading/loading.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    declarations: [
        GoogleMapsComponent,
        LoadingComponent
    ],
    exports: [
        GoogleMapsComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class CommonComponentsModule {
}
