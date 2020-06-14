import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthRedirectGuard} from './guards/auth-redirect.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./view-register/view-register.module').then(m => m.ViewRegisterModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
