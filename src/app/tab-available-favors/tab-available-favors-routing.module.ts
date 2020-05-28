import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabAvailableFavorsComponent} from './tab-available-favors.component';
import {FavorDetailComponent} from './favor-detail/favor-detail.component';

const routes: Routes = [
    {
        path: '',
        component: TabAvailableFavorsComponent
    },
    {
        path: 'favor-detail',
        component: FavorDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabAvailableFavorsRoutingModule {
}
