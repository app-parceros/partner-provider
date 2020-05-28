import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabHelpComponent} from './tab-help.component';

const routes: Routes = [
    {
        path: '',
        component: TabHelpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabHelpRoutingModule {
}
