import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabCurrentFavorComponent} from './tab-current-favor.component';

const routes: Routes = [
  {
    path: '',
    component: TabCurrentFavorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabCurrentFavorRoutingModule {}
