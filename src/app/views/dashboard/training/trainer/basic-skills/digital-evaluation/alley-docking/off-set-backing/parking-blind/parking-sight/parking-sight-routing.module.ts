import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingSightPage } from './parking-sight.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingSightPage
  },
  {
    path: 'coup-uncoup',
    loadChildren: () => import('./coup-uncoup/coup-uncoup.module').then( m => m.CoupUncoupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingSightPageRoutingModule {}
