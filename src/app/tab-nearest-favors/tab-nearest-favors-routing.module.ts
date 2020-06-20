import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavorDetailComponent} from './favor-detail/favor-detail.component';
import {FavorListComponent} from './favor-list/favor-list.component';

const routes: Routes = [
    {
        path: 'favor-list',
        component: FavorListComponent
    },
    {
        path: 'favor-detail',
        component: FavorDetailComponent
    },
    {
        path: '',
        redirectTo: 'favor-list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabNearestFavorsRoutingModule {
}
