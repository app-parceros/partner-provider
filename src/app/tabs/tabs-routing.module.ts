import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'current-favor',
                loadChildren: () => import('../tab-current-favor/tab-current-favor.module')
                    .then(m => m.TabCurrentFavorModule)
            },
            {
                path: 'nearest-favors',
                loadChildren: () => import('../tab-nearest-favors/tab-nearest-favors.module')
                    .then(m => m.TabNearestFavorsModule)
            },

            {
                path: 'home',
                loadChildren: () => import('../tab-home/tab-home.module')
                    .then(m => m.TabHomeModule)
            },
            {
                path: 'summary',
                loadChildren: () => import('../tab-summary/tab-summary.module')
                    .then(m => m.TabSummaryModule)
            },
            {
                path: 'help',
                loadChildren: () => import('../tab-help/tab-help.module')
                    .then(m => m.TabHelpModule)
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
