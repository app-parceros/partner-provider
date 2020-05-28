import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabSummaryComponent} from './tab-summary.component';

const routes: Routes = [
    {
        path: '',
        component: TabSummaryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabSummaryRoutingModule {
}
