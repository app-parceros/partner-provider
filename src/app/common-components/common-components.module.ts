import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsComponent} from './google-maps/google-maps.component';


@NgModule({
    declarations: [
        GoogleMapsComponent
    ],
    exports: [
        GoogleMapsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CommonComponentsModule {
}
