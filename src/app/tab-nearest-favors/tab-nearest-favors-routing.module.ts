import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavorDetailComponent} from './favor-detail/favor-detail.component';
import {FavorListComponent} from './favor-list/favor-list.component';

const routes: Routes = [
    {
        path: 'favor',
        component: FavorListComponent
    },
    {
        path: 'favor/:favorId',
        component: FavorDetailComponent
    },
    {
        path: '',
        redirectTo: 'favor',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabNearestFavorsRoutingModule {
}
